declare namespace Qualtrics {
    export type SurveyEngineFunction = (this: Qualtrics.SurveyEngine) => void;
    export interface QuestionInfo {
        QuestionID: string;
        QuestionText: string;
        QuestionType: string;

        Choices: {
            RecodeValue: string;
            VariableName: string;
            Text: string;
            Exclusive: boolean;
        };
    }

    export interface SurveyEngine {
        /**
         * Adds embedded data to the page
         */
        addEmbeddedData: (key: string, value: string) => void;
        /**
         * Adds an observer/listener to the click event on the question. Rather than calling addOnClick directly, this method will be called automatically by the addOnLoad method. You only need to assign a function to the questionclick property and the Survey Engine will take care of it for you.
         */
        addOnClick: (f: SurveyEngineFunction) => void;

        addOnPageSubmit: (f: SurveyEngineFunction) => void;

        addOnReady: (f: SurveyEngineFunction) => void;

        addOnUnload: (f: SurveyEngineFunction) => void;
        addOnload: (f: SurveyEngineFunction) => void;
        clickNextButton: VoidFunction;
        disableNextButton: VoidFunction;
        disablePreviousButton: VoidFunction;
        displayErrorMessage: (msg: string) => void;
        enableNextButton: VoidFunction;
        enablePreviousButton: VoidFunction;
        getAnswers: () => Array<any>;
        getChoiceAnswerValue: (
            choiceId: string,
            answerId: string,
            subId: string
        ) => string;
        getChoiceContainer: VoidFunction;
        getChoiceDisplayed: (
            choiceId: string,
            answerId: string,
            subId: string
        ) => boolean;
        getChoiceRecodeValue: (choiceId: string) => void;
        getChoiceValue: (choiceId: string, subId?: string) => string;
        getChoiceVariableName: (choiceId: string) => string;
        getChoices: () => Array<any>;
        getChoicesFromRecodeValue: (recodeVal: string) => Array<any>;
        getChoicesFromVariableName: (varName: string) => Array<any>;
        getPostTag: () => string | null;
        getQuestionContainer: () => HTMLElement;
        getQuestionDisplayed: () => boolean;
        getQuestionInfo: () => QuestionInfo | null;
        getQuestionTextContainer: () => HTMLElement;
        getSelectedAnswerValue: (choiceId: object) => string;
        getSelectedAnswers: () => Array<any>;
        getTextValue: (choiceId?: string) => string;
        hideChoices: VoidFunction;
        hideNextButton: VoidFunction;
        hidePreviousButton: VoidFunction;
        setChoiceAnswerValue: (
            choiceId: string,
            answerId: string,
            subId: string
        ) => boolean;
        setChoiceValue: (choiceId: string, subId?: string, value?: string) => boolean;
        setChoiceValueByRecodeValue: (
            recodeValue: string,
            subId?: string,
            value?: string
        ) => boolean;
        setChoiceValueByVariableName: (
            variableName: string,
            subId?: string,
            value?: string
        ) => boolean;
        setEmbeddedData: (key: string, value: string) => void;
        showNextButton(): VoidFunction;
        showPreviousButton: VoidFunction;
    }
}
