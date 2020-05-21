import itertools
import math
import os
import shutil
from glob import iglob
from typing import *

import numpy as np
import pandas as pd
import json
import re

from utils import *

REGEX_QUESTION = re.compile("^(Q\d+(\.\d+))")
REGEX_KEY_VALUE_SPLIT = re.compile("^(.*)\((\d+)\)")


def file_components(filepath: str) -> Tuple[str, str, str]:
    dirpath = os.path.dirname(os.path.realpath(filepath))
    filename, ext = os.path.splitext(os.path.basename(filepath))
    return (dirpath, filename, ext)


def map_questions(filepath: str) -> Tuple[dict, pd.DataFrame]:
    with open(filepath, "r") as file:
        questions: Dict[str, Dict[int, str]] = {}

        block_found = False
        question_dict: Dict[int, str] = {}
        question = ""

        for line in file.readlines():
            question_match = re.search(REGEX_QUESTION, line)
            block_found |= question_match != None

            if (question_match is not None):
                questions[question] = question_dict
                question_dict = {}
                question = question_match.group(0)
            elif (block_found):
                key_value_match = re.match(REGEX_KEY_VALUE_SPLIT, line)
                if (key_value_match is not None):
                    try:
                        value, key = str(key_value_match.group(
                            1)).strip(), int(key_value_match.group(2))
                        question_dict[key] = value
                    except TypeError:
                        pass
    out_list = []

    for question, question_dict in questions.items():
        for key, value in question_dict.items():
            d = {"question": question, "key": key, "value": value}
            out_list.append(d)

    return (questions, pd.DataFrame(out_list))


def main():
    '''
    Takes in an input qualtrics code mapping file and returns the numeric
    code values mapped to their string counterparts.
    Outputs both a dictionary thereof in JSON and a CSV for easy data base joining.
    '''
    parser = argparse.ArgumentParser()
    parser.add_argument("-i", "--input",
                        help="Input file path")
    args = parser.parse_args()

    filepath = args.input
    dirpath, filename, ext = file_components(filepath)

    out_path = os.path.join(dirpath, filename + "_MAPPING")
    out_json_path = out_path + ".json"
    out_csv_path = out_path + ".csv"

    questions, df = map_questions(filepath)

    df.to_csv(out_csv_path, index=False)
    json.dump(questions, open(out_json_path, "w"))
