let interviewList = [];
let rejectedList = [];
let Status = 'all';

const cardContainer = document.getElementById('card-container');
const filterSection = document.getElementById('filter-section');
const total = document.getElementById('total');
const interviewCount = document.getElementById('interview');
const rejectedCount = document.getElementById('rejected');
const jobCount = document.getElementById('job-count');
const allCardSection = document.getElementById('allCards');
const noJobs = document.getElementById('no-jobs');
const filterBtns = document.querySelectorAll('.filter-btn');
const mainContainer = document.querySelector('main');

const jobs = [
    { companyName: "Mobile First Corp", position: "React Native Developer", location: "Remote • Full-time • $130,000 - $175,000", state:"Not Applied", description:"Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide."},
    { companyName: "WebFlow Agency", position: "Web Designer & Developer", location: "Los Angeles, CA • Part-time • $80,000 - $120,000", state:"Not Applied", description:"Create stunning web experiences for high-profile clients. Must have portfolio and experience with modern web design trends."},
    { companyName: "DataViz Solutions", position: "Data Visualization Specialist", location: "Boston, MA • Full-time • $125,000 - $165,000", state:"Not Applied", description:"Transform complex data into compelling visualizations. Required skills: D3.js, React, and strong analytical thinking."},
    { companyName: "CloudFirst Inc", position: "Backend Developer", location: "Seattle, WA • Full-time • $140,000 - $190,000", state:"Not Applied", description:"Design and maintain scalable backend systems using Python and AWS. Work with modern DevOps practices and cloud infrastructure."},
    { companyName: "Innovation Labs", position: "UI/UX Engineer", location: "Austin, TX • Full-time • $110,000 - $150,000", state:"Not Applied", description:"Create beautiful and functional user interfaces for our suite of products. Strong design skills and frontend development expertise required."},
    { companyName: "MegaCorp Solutions", position: "JavaScript Developer", location: "New York, NY • Full-time • $130,000 - $170,000", state:"Not Applied", description:"Build enterprise applications with JavaScript and modern frameworks. Competitive compensation and development opportunities."},
    { companyName: "StartupXYZ", position: "Full Stack Engineer", location: "Remote • Full-time • $120,000 - $160,000", state:"Not Applied", description:"Join our fast-growing startup and work on our core platform. Experience with Node.js and React required. Great benefits and equity package included."},
    { companyName: "TechCorp Industries", position: "Senior Frontend Developer", location: "San Francisco, CA • Full-time • $130,000 - $175,000", state:"Not Applied", description:"We are looking for an experienced Frontend Developer to build scalable web applications using React and TypeScript. You will work with a talented team on cutting-edge projects."},
];
function Cards(list, container){
    container.innerHTML = '';
    for (const job of list) {
        const div = document.createElement('div');
        div.className = 'card border border-base-200 shadow bg-base-100 p-4 flex justify-between flex-row';
        div.innerHTML = `
        <div class="left space-y-6">
            <p class="companyName text-2xl font-bold text-[#002C5C] mb-1">${job.companyName}</p>
            <p class="position text-[#64748B] mb-1">${job.position}</p>
            <p class="location text-[#64748B] mb-2">${job.location}</p>
            <p class="state border border-base-200 rounded w-[120px] py-2 text-center bg-base-200 text-[#002C5C] mb-2">${job.state}</p>
            <p class="description text-[#002C5C]">${job.description}</p>
            <div>
                <button class="interview-btn btn border-green-500 text-green-600 no-underline">Interview</button>
                <button class="rejected-btn btn border-red-500 text-red-600 no-underline">Rejected</button>
            </div>
        </div>
        <button class="btn"><i class="delete-btn fa-solid fa-trash-can"></i></button>`;
        container.appendChild(div);
    }
}
Cards(jobs, cardContainer);
updateCounts();
jobCount.innerText = jobs.length;

function updateCounts(){
    total.innerText = cardContainer.children.length;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;
}

mainContainer.addEventListener('click', function(e){
    const target = e.target;
    if(target.classList.contains('interview-btn') || target.classList.contains('rejected-btn') || target.classList.contains('delete-btn')){
        const card = target.closest('.card');
        const companyName = card.querySelector('.companyName').innerText;
        const stateElem = card.querySelector('.state');

        if(target.classList.contains('interview-btn')){
            stateElem.innerText = 'Interview';
            stateElem.classList.add('border','border-green-500','text-green-600','font-bold');
            if(!interviewList.find(i=>i.companyName===companyName)) interviewList.push({companyName});
            rejectedList = rejectedList.filter(i=>i.companyName!==companyName);
        }
        else if(target.classList.contains('rejected-btn')){
            stateElem.innerText = 'Rejected';
            stateElem.classList.add('border','border-red-500','text-red-600','font-bold');
            if(!rejectedList.find(i=>i.companyName===companyName)) rejectedList.push({companyName});
            interviewList = interviewList.filter(i=>i.companyName!==companyName);
        }
        else if(target.classList.contains('delete-btn')){
            card.remove();
            interviewList = interviewList.filter(i=>i.companyName!==companyName);
            rejectedList = rejectedList.filter(i=>i.companyName!==companyName);
        }
        updateCounts();
    }
});


for (const btn of filterBtns) {
    btn.addEventListener('click', ()=>{
        for (const b of filterBtns) {
            b.classList.remove('btn-primary','text-white');
            b.classList.add('bg-base-100','text-[#64748B]');
        }
        btn.classList.add('btn-primary','text-white');
        btn.classList.remove('bg-base-100','text-[#64748B]');
        Status = btn.id;

        if(Status==='all-filter-btn'){
            allCardSection.classList.remove('hidden');
            filterSection.classList.add('hidden');
            noJobs.classList.add('hidden');
            jobCount.innerText = cardContainer.children.length;
        }
        else{
            allCardSection.classList.add('hidden');
            filterSection.classList.remove('hidden');
            let list = Status==='interview-filter-btn'? interviewList : rejectedList;
            if(list.length===0){
                filterSection.innerHTML = '';
                noJobs.classList.remove('hidden');
                jobCount.innerText = 0;
            }
            else{
                Cards(jobs.filter(job=> list.find(i=>i.companyName===job.companyName)), filterSection);
                noJobs.classList.add('hidden');
                jobCount.innerText = `${list.length} out of ${cardContainer.children.length}`;
            }
        }
    });
}