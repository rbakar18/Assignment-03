// File : 02_app_demo.js
//
//
// appState, keep information about the State of the application.
const appState = {
    current_view : "#intro_view",
    current_question : -1,
  //  current_quiz: "",
    quiz_name:"",
    current_model : {},
    answers_right:0,
    answers_wrong:0,
    question_amount: 20,
}

async function get_Data(quizSelection, question_type){
  var api_url = 'https://my-json-server.typicode.com/rbakar18/quiz-questions'
  var endpoint = `${api_url}/${quizSelection}/${question_type}`

  const data = await fetch(endpoint)
  var model = await data.json()

  appState.current_model = model;
  console.log(data)

  setQuestionView(appState);
  update_view(appState);

  return model
}


/*async function get_Data(quizSelection, question_type){
  let fake_api = "";

  if (quizSelection == "quiz") {
    fake_api = 'https://my-json-server.typicode.com/rbakar18/QuizQuestions'
  }
  let fake_api_endpoint = `${fake_api}/${quizSelection}/${question_type}`
  const response = await fetch(fake_api_endpoint);
  const data_arrival = await response.json();

  appState.current_model = data_arrival;
  setQuestionView(appState);
  update_view(appState);

document.getElementById("numcorrect").innerHTML = appState.answers_right + appState.answers_wrong;
  if(question_type==1){
    document.getElementById("numincorrect").innerHTML=0;
  }else{
    document.getElementById("numincorrect").innerHTML = +((appState.answers_right / (appState.answers_wrong + appState.answers_wrong)) * 100);
  }
  return (data_arrival);
}
*/

//
// start_app: begin the applications.
//

document.addEventListener('DOMContentLoaded', () => {
  // Set the state
  appState.current_view = "#intro_view";
  appState.current_model = {
    action : "quiz",
  }
  update_view(appState);

  //
  // EventDelegation - handle all events of the widget
  //

  document.querySelector("#widget_view").onclick = (e) => {
      handle_widget_event(e)
  }
});
/*
function setFeedbackView(answerCheck){
  if (answerCheck == true) {
    appState.current_view = "#answer_correct_feedback_view";
  }else{
    appState.current_view = "#answer_incorrect_feedback_view";

  }
}

function setExplanationView() {
  appState.current_view = "#explanation_view";
}

function displayExplanation(answerCheckFor) {

  if (!answerCheckFor) {
    new Promise(function (resolve, reject) {
      setTimeout(resolve, 1000);
    }).then(function () {
      if (!answerCheckFor) {
        setExplanationView();
        update_explanationView(appState);
      }

    });
  }

  if (answerCheckFor) {
    new Promise(function (resolve, reject) {
      setTimeout(resolve, 1000);
    }).then(function () {
      updateQuestion(appState);
      setQuestionView(appState);
      update_view(appState);
    });
  }
}
*/

function handle_widget_event(e) {

  if (appState.current_view == "#intro_view"){
    if (e.target.dataset.action == "quiz") {
      console.log
      appState.current_question = 0;
      appState.quiz_name = document.querySelector('input[name="quiz_name"]:checked').value;
      var current_question_data = get_Data(appState.quiz_name, appState.current_question)
      console.log(appState)
    //  get_Data(appState.current_question + 1, appState.current_quiz);
    }
  }

  if (appState.current_view == "#question_view_multiple_choice"){
    if(e.target.dataset.action == "answer"){
      isCorrect = check_user_response(e.target.dataset.answer, appState.current_model);

      console.log("Update question_view_multiple_choice")
      console.log(appState)

      updateQuestion(appState);
  }
}
  if (appState.current_view == "#question_view_true_false") {

    if (e.target.dataset.action == "answer") {
      // Controller - implement logic.
      isCorrect = check_user_response(e.target.dataset.answer, appState.current_model);

      // Update the state.
      appState.current_question =   appState.current_question + 1;
      appState.current_model = questions[appState.current_question];
      setQuestionView(appState);

      // Update the view.
      update_view(appState);

    }
  }
  if (appState.current_view == "#question_view_text_input") {
      if (e.target.dataset.action == "submit") {

          user_response = document.querySelector(`#${appState.current_model.answerFieldId}`).value;
          isCorrect = check_user_response(e.target.dataset.answer, appState.current_model);
          updateQuestion(appState)
          //appState.current_question =   appState.current_question + 1;
          //appState.current_model = questions[appState.current_question];
          setQuestionView(appState);
          update_view(appState);
      }
   }

      //let selections = document.getElementsByName("choice");
      //let user_selection;
/*
      for(let i = 0; i < selections.length; i++){
        if(selections[i].checked){
          user_selection = selections[i].value;
        }
      }

      answerCheck = check_user_response(user_response, appState.current_model);

      if (isCorrect){
        appState.answers_right++;
      }else{
        appState.answers_wrong++;
      }
      setFeedbackView(answerCheck);
      update_feedbackView(appState);
      displayExplanation(answerCheck);
*/
  if (appState.current_view == "#end_view"){
    if (e.target.dataset.action == "start_again") {
      appState.current_view =  "#intro_view";
      appState.current_model = {
        action : "start_app"
      }
      update_view(appState);

    }
/*
    let cumulativeScore = +((appState.answers_right / (appState.answers_right + appState.answers_wrong))*100);
    if (cumulativeScore >= 80){
      document.getElementById("end_message").innerHTML = "Results: " + cumulativeScore + " Epic! You passed, pop some champagne :)."
  }else{
    document.getElementById("end_message").innerHTML = "Results: " + cumulativeScore + " Bad Ending. You failed :(. Try again though."
    }
*/
  }

}
// Handle the answer event.

/*


   // Handle answer event for  text questions.


    // Handle answer event for  text questions.
    if (appState.current_view == "#end_view") {
        if (e.target.dataset.action == "start_again") {
          appState.current_view =  "#intro_view";
          appState.current_model = {
            action : "start_app"
          }
          update_view(appState);

        }
      }

 } // end of hadnle_widget_event
*/

function check_user_response(user_answer, model) {
  if (user_answer == model.correctAnswer) {
    return true;
  }
  return false;
}

function updateQuestion(appState) {
  if (appState.current_question < appState.question_amount) {
    appState.current_question = appState.current_question + 1;
  //  get_Data(appState.current_question + 1, appState.current_quiz);
  }
  else {
    appState.current_question = -2;
    appState.current_model = {};
  }
}

function setQuestionView(appState){
  if(appState.current_question == -2){
    appState.current_view = "#end_view";
    return
  }
    if (appState.current_model.questionType == "multiple_choice")
      appState.current_view = "#question_view_multiple_choice";
    else if (appState.current_model.questionType == "true_false"){
      appState.current_view = "#question_view_true_false";
    }
    else if (appState.current_model.questionType == "text_input"){
      appState.current_view = "#question_view_text_input";
      console.log("epic yolo swag")
    }

  }

function update_view(appState) {
  const html_element = render_widget(appState.current_model, appState.current_view)
  document.querySelector("#widget_view").innerHTML = html_element;
  }
/*
function update_feedbackView(appState){
  const html_element = render_widget(appState.current_model, appState.current_view)
  document.querySelector("#widget_view").innerHTML = html_element;
}
*/
const render_widget = (model, view) => {
  // Get the template HTML
  template_source = document.querySelector(view).innerHTML
  // Handlebars compiles the above source into a template
  var template = Handlebars.compile(template_source);
  // apply the model to the template.
  var html_widget_element = template({ ...model, ...appState })

  return html_widget_element
}
