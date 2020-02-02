
function createTextElement(text, tagName = 'p') {
    let pElement = document.createElement(tagName);
    pElement.innerText = text;
    return pElement;
}

function Answer(answerControlType, questionText = '', questionName = '') {
    let answerType = answerControlType;
    let text = questionText;
    let extended;
    let extendedContainer;
    let name = questionName;

    let ans;

    this.getAnswerType = () => { return answerType; }

    this.createAnswerElement = (questionName, id, extendedA = null) => {
        if (questionName !== null) {
            name = questionName;
        }
        ans = document.createElement('input');
        ans.setAttribute('name', name);
        ans.setAttribute('id', id);
        ans.setAttribute('type', answerType);
        ans.setAttribute('value', text);

        ans.addEventListener('change', ($event) => {
            var radios = document.querySelectorAll('input[type=radio][name="' + name + '"]');

            for (var i = 0; i < radios.length; i++) {
                if (radios[i].value !== event.target.value) {
                    let ext = document.querySelector('#' + radios[i].getAttribute('id') + "_ext");

                    if (ext) {
                        ext.parentElement.removeChild(ext);
                    }
                } else {
                    radios[i].parentElement.appendChild(extendedContainer);
                }
            }
        });

        let container = document.createElement('div');

        container.appendChild(ans);

        if (answerType === 'radio' || answerType === 'checkbox') {
            let label = document.createElement('label');
            label.innerText = questionText;
            label.setAttribute('for', id);
            container.appendChild(label);
        }

        extendedContainer = document.createElement('div');
        extendedContainer.setAttribute('id', id + '_ext');
        extendedContainer.setAttribute('class', 'extended');

        if (extendedA !== null) {
            extended = extendedA;
            extendedContainer.appendChild(extended);
        }

        return container;
    }
}

function Question(questionNumber, questionTitle) {
    let title = questionTitle;
    let number = questionNumber;
    let answers = [];
    let questionContainer;
    let answersContainer;
    let headerContainer;

    this.addAnswer = (answer, ext) => {
        let questionId = 'question-name-' + number
        if (ext) {
            container = answer.createAnswerElement(
                answer.getAnswerType() === 'radio' ? questionId : 'id-' + number + '-' + answers.length,
                'id-' + number + '-' + answers.length,
                ext.createAnswerElement(
                    null,
                    'id-' + number + '-' + answers.length
                )
            );
        } else {
            container = answer.createAnswerElement(
                answer.getAnswerType() === 'radio' ? questionId : 'id-' + number + '-' + answers.length,
                'question-id-' + number + '-' + answers.length);
        }

        answersContainer.appendChild(container);

        answers.push(answer);
    }

    this.buildQuestion = (parentElement, questionId) => {
        questionContainer = document.createElement('fieldset');
        questionContainer.setAttribute('id', questionId + number);

        headerContainer = createTextElement((number + 1) + ' ' + title, 'legend');
        questionContainer.appendChild(headerContainer);
        answersContainer = document.createElement('div');
        answersContainer.setAttribute('class', 'radio-buttons-container');
        questionContainer.appendChild(answersContainer);
        parentElement.appendChild(questionContainer);
    }

}

