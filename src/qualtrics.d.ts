declare namespace Qualtrics {
    export type SurveyEngineFunction = (this: any) => void;

    export interface SurveyEngine {
        addEmbeddedData: (key: string, value: string) => void;

        addOnClick: (f: SurveyEngineFunction) => void;
        addOnload: (f: SurveyEngineFunction) => void;
        addOnReady: (f: SurveyEngineFunction) => void;
        addOnPageSubmit: (f: SurveyEngineFunction) => void;
        addOnUnload: (f: SurveyEngineFunction) => void;

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
        getChoices: () => Array<any>;
        getChoicesFromRecodeValue: (recodeVal: string) => Array<any>;
        getChoicesFromVariableName: (varName: string) => Array<any>;
        getChoiceValue: (choiceId: string, subId?: string) => string;
        getChoiceVariableName: (choiceId: string) => string;
        getPostTag: () => string | null;
        getQuestionContainer: () => HTMLElement;
        getQuestionDisplayed: () => boolean;
        getQuestionInfo: () => object | null;
        getQuestionTextContainer: () => HTMLElement;
        getSelectedAnswers: () => Array<any>;
        getSelectedAnswerValue: (choiceId: object) => string;
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
    }
}
