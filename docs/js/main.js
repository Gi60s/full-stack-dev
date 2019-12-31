(function () {
  const body = document.querySelector('.post-content');
  const rxStart = /^\s*<--\s*$/;
  const rxMid = /^\s*--\s*$/;
  const rxEnd = /^\s*-->\s*$/;

  // capture all question and answer sets
  const qaSets = [];
  let store;
  let set;
  Array.from(body.children).forEach(child => {
    if (store) store.push(child);
    if (child.nodeType === 1) {
      if (rxStart.test(child.innerText) && !set) {
        set = {
          question: [ child ],
          answer: []
        };
        store = set.question;
      } else if (rxMid.test(child.innerText) && set) {
        store = set.answer;
      } else if (rxEnd.test(child.innerText) && set) {
        qaSets.push(set);
        store = null;
        set = null;
      }
    }
  });

  // rework each set into question and answer groups
  qaSets.forEach(set => {
    const group = document.createElement('div');
    group.className = 'question-answer';

    const start = set.question.shift();
    const mid = set.question.pop();
    const end = set.answer.pop();
    const parent = start.parentNode;

    const question = document.createElement('div');
    question.className = 'question';
    set.question.forEach(el => question.appendChild(el));

    const answer = document.createElement('div');
    answer.className = 'answer';
    set.answer.forEach(el => answer.appendChild(el));

    group.appendChild(question);
    group.appendChild(answer);
    parent.replaceChild(group, start);
    parent.removeChild(mid);
    parent.removeChild(end);
  });


  console.log(qaSets);

  Array.from(document.querySelectorAll('.question'))
    .forEach(el => {
      el.parentNode.className += ' question-answer';
      el.addEventListener("click", function() {
        el.parentNode.classList.toggle('show');
      });
    });
})();
//
// Array.from(document.querySelectorAll('.question.end,.answer.end'))
//   .forEach(longQuestion)
//
// function longQuestion (end) {
//   // find the top level
//   let node = end;
//   while (node.parentElement && !node.parentElement.classList.contains('post-content')) node = node.parentElement;
//   node.parentElement.insertBefore(end, node.nextSibling);
//
//   // store a reference of all nodes between start and end
//   const els = [];
//   const selector = end.classList.contains('answer') ? '.answer' : '.question';
//   let target = null;
//   node = end;
//   do {
//     node = node.previousElementSibling;
//     target = node.querySelector(selector);
//     if (!target) els.unshift(node);
//   } while (!target);
//
//   // move elements inside of the start element
//   target.appendChild(document.createElement('br'));
//   target.appendChild(document.createElement('br'));
//   els.forEach(el => {
//     target.appendChild(el);
//   });
//
//   // remove the end element
//   end.parentNode.removeChild(end);
// }
