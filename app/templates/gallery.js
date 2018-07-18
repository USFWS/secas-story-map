const _ = require('../js/util')._;

const galleryTemplate = (items) => {
  return items.map(createGalleryItem).join('');
}

const createGalleryItem = (item) => {
  const slug = _.slugify(item.properties.theme)
  return `
    <li class="gallery-item" data-name="${item.properties.title}">
      <div class="teaser">
        <p>${item.properties.title}</p>
        <img src="./images/photos/thumbnail/${item.properties.photo}" alt="Placeholder image" />
      </div>
    </li>`;
}

module.exports = galleryTemplate;