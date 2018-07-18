const _ = require("../js/util")._;

const infoWindowTemplate = (project) => {
  const slug = _.slugify(project.theme);
  return `
    <div class="info-window-photo">
      <img src="./images/photos/${project.photo}" alt="" />
      <p class="info-window-caption">${project.caption}</p>
    </div>
    <div class="project-description">
      <h2>${project.title}</h2>
      <p>${project.description}</p>
    </div>`;
};

module.exports = infoWindowTemplate;