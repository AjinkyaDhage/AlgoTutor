var quiz = [{
    question: "1. Which of the following is Informed Search Strategy?",
    options: ["Breadth First Search", "Recusrsive Best First Search", "Depth First Search", "Uniform Cost Search"],
    description: "Greedy Best First Search, Recursive Best First Search (RBFS) and A-star Search are the examples of Informed Search Strategies.",
    answer: 1
}, {
    question: "2. Which of the following is NOT one of the metrics used to formulate the problems in AI",
    options: ["States", "Actions", "Heuristic", "Path Cost"],
    description: "Metrics used to formulate problems in AI are States, Initial State, Goal State, Actions and Path Cost.",
    answer: 2
}, {
    question: "3. Which of the following functions does A-star Algorithm use to evaluate a current node?",
    options: ["f(n) = g(n) + h(n)", "f(n) = g(n) - h(n)", "f(n) = g(n) X h(n)", "f(n) = g(n) / h(n)"],
    description: "f(n) = g(n) + h(n) is used to evauate a current node, as this value helps to find the next best node.",
    answer: 0
}, {
    question: "4. What does function g(n) represent in A-Star Algorithm?",
    options: ["Distance of node n from the root node", "Distance of node n from the Goal State", "Distance of node n from the agent", "Cost of node n"],
    description: "g(n) represents the distance of node current node from the root node. It can be considered as a depth of the current node in the search tree.",
    answer: 0
}, {
    question: "5. A-Star Algorithm is also known as",
    options: ["Greedy Best First Search", "Depth First Search", "Best First Search", "Iterative Deepening Search"],
    description: "A-Star Algorithm is also known as Best First Search, because it has ability to select the best of the two or more non-goal states.",
    answer: 2
},
{
    question: "6. Which of the following is NOT TRUE about uninformed search strategies?",
    options: ["Also called as blind search strategies", "Agent has additional information about the states", "Agent is not capable of differentiating non-goal states", "Agent may stuck in infinite loop"],
    description: "Agent does not have additional information about the states in uninformed search strategies, as it is not capable of differentiating non-goal states.",
    answer: 1
}, {
    question: "7. Which of the following is TRUE about informed search strategies?",
    options: ["Also called as blind search strategies", "Agent does not have additional information about the states", "Agent is capable of differentiating non-goal states", "Agent may stuck in infinite loop"],
    description: "Agent is capable of differentiating non-goal states, which makes these strategies optimal and complete.",
    answer: 2
}, {
    question: "8. What does OPEN LIST represnt in A-Star Algorithm?",
    options: ["List of nodes that need to be expanded", "List of nodes that need to be deleted", "List of nodes that need to be added", "List of nodes that are already expanded"],
    description: "In each iteration, the best node which is to be expanded is inserted into OPEN LIST in A-Star Algorithm.",
    answer: 0
}, {
    question: "9. What does CLOSED LIST represnt in A-Star Algorithm?",
    options: ["List of nodes that need to be expanded", "List of nodes that need to be deleted", "List of nodes that need to be added", "List of nodes that are already expanded"],
    description: "CLOSED LIST helps A-Star algorithm to preven infinite loops, as it keeps track of visited or expanded nodes using CLOSED LIST.",
    answer: 3
}, {
    question: "10. What is Manhattan Distance?",
    options: ["A heuristic used to find the cheapest path from the current state", "Direct distance from a node to the goal state", "Both 1 & 2", "None of the above"],
    description: "Manhattan Distance is the direct distance from a node to the goal state. Hence this is also used as a heuristic to find next best node as the direct distance is the cheapest path.",
    answer: 2
}];

var currentQuestion = 0;
var score = 0;
var isChecked = false;
var quizStarted = false;
$(document).ready(function () {
    $(this).find(".radioLabel0").on("click touchstart", function () {
        $(this).find(".radioLabel0").val(0);
        isChecked = true
    });

    $(this).find(".radioLabel1").on("click touchstart", function () {
        $(this).find(".radioLabel1").val(1);
        isChecked = true;
    });

    $(this).find(".radioLabel2").on("click touchstart", function () {
        $(this).find(".radioLabel2").val(2);
        isChecked = true;
    });

    $(this).find(".radioLabel3").on("click touchstart", function () {
        $(this).find(".radioLabel3").val(3);
        isChecked = true;
    });

    $( ".popupImg" ).on({
        popupbeforeposition: function() {
            var maxHeight = $( window ).height() - 60 + "px";
            var maxWidth = $( window ).width() - 100 + "px";
                
            $( ".popupImg img" ).css( "max-height", maxHeight );
            $( ".popupImg img" ).css( "max-width", maxWidth );
        }
    });

    $("#startQuiz").on("click", function () {
        currentQuestion = 0;
        score = 0;
    	displayQuestion();
    });
                  
    $("#quitQuiz").on("click", function () {
        currentQuestion = 0;
        score = 0;
        $(':mobile-pagecontainer').pagecontainer('change', '#quizHome');
    });

    $(this).find(".nextButton").on("click", function () {
            selectedOption = $("input[type='radio']:checked").val();
            className = $("input[type='radio']:checked").attr('class');
            
            if (selectedOption == undefined || isChecked == false) {
                $( "#errorPopup" ).popup({
                  positionTo: "#errorPopupPosition"
                });

                var positionTo = $( "#errorPopup" ).popup( "option", "positionTo" );
                $("#errorPopup" ).popup( "option", "positionTo", "#errorPopupPosition" );
                $("#errorPopup").popup('open');

            } else {
                
                $(".radioLabel"+selectedOption).removeClass("ui-radio-on");
                $(".radioLabel"+selectedOption).addClass("ui-radio-off");
                isChecked = false;

                if (selectedOption == quiz[currentQuestion].answer) {
                    score++;
                }

                currentQuestion++;
                if (currentQuestion < quiz.length) {

                    displayQuestion();

                } 
                else {
    				if(score < quiz.length){
    					$(document).find(".resultStatus").html("You have Failed the test");
    				}
    				else{
    					$(document).find(".resultStatus").html("Congratulations!! Yo have successfully completed the assessment.");
    				}

                    $(document).find(".score").html("Score: " + score + " / " + quiz.length);
                                   
                    createSolutionSet();

                    currentQuestion = 0;
                    score = 0;
                                   
                    

                    $(':mobile-pagecontainer').pagecontainer('change', '#quizResult');
                }
            }
    });
});


function displayQuestion() {
    var question = quiz[currentQuestion].question;
    var questionClass = $(document).find(".question");
    var optionList = $(document).find(".optionList");
    var optionList1 = $(document).find(".optionList1");
    var numberOfOptions = quiz[currentQuestion].options.length;

    $(optionList1).find(".question").html(question);
    
    var option;
    for (i = 0; i < numberOfOptions; i++) {
        option = quiz[currentQuestion].options[i];
        $(document).find(".radioLabel"+i).html(option);
    }
}

function createSolutionSet(){
    var answerIndex=0;

    for (i = 0; i < quiz.length; i++) {
        $(document).find("#q"+i).html(quiz[i].question);
        answerIndex = quiz[i].answer;
        $(document).find("#q"+i+"-ans").html("Answer: "+quiz[i].options[answerIndex]);
        $(document).find("#q"+i+"-des").html("<strong>Description: </strong>"+quiz[i].description);
    }
}
