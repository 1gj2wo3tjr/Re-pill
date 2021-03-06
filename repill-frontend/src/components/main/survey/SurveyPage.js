import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "survey-react/modern.min.css";
import { Survey, StylesManager, Model } from "survey-react";
import { Navigate, useNavigate } from "react-router-dom";

StylesManager.applyTheme("modern");

function SurveyPage() {
  let token = sessionStorage.getItem("token");
  const [sb, setSb] = useState([]); // sb에 주관식 2개 있음
  const [ob, setOb] = useState([]);
  const element = [];
  const choices = [[], [], [], [], [], [], [], [], []];

  // 주관식 filter된 배열을 하나씩 꺼내서 저장
  for (let i = 0; i < sb.length; i++) {
    element.push({
      name: `${sb[i].id}`,
      title: `${sb[i].content}`,
      type: "text",
      isRequired: true,
      inputType: "number",
      placeHolder: "숫자를 입력해주세요",
    });
  }

  // 객관식 filter된 배열을 하나씩 꺼내서 저장
  for (let i = 0; i < ob.length; i++) {
    for (let j = 0; j < ob[i].choices.length; j++) {
      choices[i].push({
        value: ob[i].choices[j].id,
        text: ob[i].choices[j].content,
      });
    }
    element.push({
      type: "checkbox",
      name: `${ob[i].number}`,
      title: `${ob[i].content}`,
      hasOther: false,
      isRequired: true,
      choices: choices[i],
    });
  }

  const pages = [];
  for (let i = 0; i < element.length; i++) {
    pages.push({ elements: [element[i]] });
  }

  const surveyJson = {
    pages,
    showProgressBar: "bottom",
    goNextPageAutomatic: false,
    showNavigationButtons: true,
    pageNextText: "next",
  };

  const survey = new Model(surveyJson);
  const navigate = useNavigate();

  survey.focusFirstQuestionAutomatic = false;
  const alertResults = useCallback((sender) => {
    const results = sender.data;
    console.log(results);
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/survey/report/`,
        {
          results,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        navigate(`/recommend`);
      })
      .catch((err) => console.log(err));
  }, []);
  survey.onComplete.add(alertResults);

  const [questions, setQuestions] = useState([]);

  const getQuestions = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/survey/question/`
      );
      // 주관식
      const sb = response.data.filter((item) => item.is_descriptive === true);
      setSb(sb);
      // 객관식
      const ob = response.data.filter((item) => item.is_descriptive === false);
      setOb(ob);
      setQuestions(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <>
      <style>
        {`
        .survey-progress {
          margin-top: 300px;
        }
        `}
      </style>
      <div>
        <Survey model={survey} />
      </div>
    </>
  );
}

export default SurveyPage;
