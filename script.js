function generateDaysCards(days) {
  let dayCards = "";
  days.forEach((day) => {
    const dayCount = day.day;
    const topic = day.topic;
    const description = day.description;
    const assignment = day.assignment;
    const codeLink = day.code_link;
    const resources = day.resources;
    const assignment_submit_link = day.assignment_submit_link;
    const card = `
        <div class="col-md-6 col-lg-4 h-auto">
            <div class="card day-card">
                <div class="card-body">
                    <h5 class="card-title">
                        Day ${dayCount}: ${topic}
                    </h5>
                    <p class="card-text">
                       ${description}
                    </p>
                    <a href="${codeLink}" class="btn btn-primary btn-sm"
                        > Code</a
                    >
                    <a
                        href="${resources.link_1}"
                        class="btn btn-secondary btn-sm"
                        target="_blank"
                        >Resource 1</a
                    >
                    <a
                        href="${resources.link_2}"
                        class="btn btn-secondary btn-sm"
                        target="_blank"
                        >Resource 2</a
                    >

                    <hr>
                    <h5>
                        Assignment No : ${dayCount

                        }
                    </h5>
                      <p>${assignment} </p>
                      <a href="${assignment_submit_link}" class="btn btn-danger">Submit Assignment</a>
                </div>
             </div>
         </div>
        `;
    dayCards += card;

  });

  return dayCards;
}


window.onload = function () {
  // hey window is ready nowS
  fetch("./roadmap.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // Or response.text() for text files
    })
    .then((jsonResponse) => {
      const data = jsonResponse;
      const courseStructure = data.course_structure;
      
      let phaseContainer="";


      courseStructure.forEach((singlePhase) => {
        const phaseName = singlePhase.phase;
        const phaseTitle = singlePhase.title;
        const days = singlePhase.days;

        console.log("Phase", phaseName);
        const cardHtml = generateDaysCards(days);
        // console.log(cardHtml);
        const singlePhaseHtml=`
        <div class="accordion-item ">
          <h2 class="accordion-header" id="${`phase${phaseName}Heading`}">
            <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#${`phase${phaseName}Collapse`}"
              aria-expanded="true"
              aria-controls="phase1Collapse"
            >
              Phase ${phaseName}: ${phaseTitle}
            </button>
          </h2>
          <div
            id="${`phase${phaseName}Collapse`}"
            class="accordion-collapse collapse"
            aria-labelledby="phase1Heading"
          >
            <div class="accordion-body">
            <div class="row">
                ${generateDaysCards(days)}
            </div>              
            </div>
          </div>
        </div>


        `
        phaseContainer+=singlePhaseHtml;
      });

      const phaseDOM=document.getElementById("courseAccordion");
      phaseDOM.innerHTML=phaseContainer;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
};
