// This is the main day count for the everything
const ROOT_DAY_COUNT=1;



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

    // updating the hero area
    if (dayCount==ROOT_DAY_COUNT) {
      updateHeroArea(assignment
        ,assignment_submit_link,codeLink,resources.link_1,resources.link_2
      )
    }





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


// updating the hero area for assignment solution
function updateHeroArea(assignment,assignment_submit_link,hero_code_link,ref_1,ref_2){
  const heroAssignment=document.getElementById("hero-assignment");
  const submitAssignment=document.getElementById("hero-assignment-submit-link");
  const codeLink=submitAssignment.nextElementSibling;
  const ref1=codeLink.nextElementSibling;
  const ref2=ref1.nextElementSibling;

  // updating the value
  heroAssignment.innerText="Asignment For Today : "+assignment;
  submitAssignment.href=assignment_submit_link;
  codeLink.href=hero_code_link;
  ref1.href=ref_1;
  ref2.href=ref_2;

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
