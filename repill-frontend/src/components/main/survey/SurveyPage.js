import React, { useState, useEffect, useCallback } from "react";
import axios from "axios"
import 'survey-react/modern.min.css';
import { Survey, StylesManager, Model } from "survey-react";

StylesManager.applyTheme("modern");

function SurveyPage() {
  const surveyJson = {
    title: "Software developer survey.",
      pages: [
          {
              "title": "What operating system do you use?",
              "elements": [
                  {
                      "type": "checkbox",
                      "name": "opSystem",
                      "title": "OS",
                      "hasOther": true,
                      "isRequired": true,
                      "choices": ["Windows", "Linux", "Macintosh OSX"]
                  }
              ]
          }]
  };
  const survey = new Model(surveyJson);
  survey.focusFirstQuestionAutomatic = false;
  const alertResults = useCallback((sender) => {
    const results = JSON.stringify(sender.data);
    alert(results);
  }, []);
  survey.onComplete.add(alertResults);

  const [questions, setQuestions] = useState([])

  const getQuestions = async() => {
    try{
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/survey/question/`)
      console.log(response.data)
      setQuestions(response.data)
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getQuestions()
  }, [])

  return (
    <>
      <div>
        <Survey model={survey} />
      </div>
    </>
  );
}

export default SurveyPage;
