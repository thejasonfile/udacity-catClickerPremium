(function() {

  const model = {
    cats: [
      {
        name: 'Socks',
        imagePath: './images/socks.jpg',
        clicks: 0
      },
      {
        name: 'Meowsers',
        imagePath: './images/meowsers.jpg',
        clicks: 0
      },
      {
        name: 'Paws',
        imagePath: './images/paws.jpg',
        clicks: 0
      },
      {
        name: 'Tiger',
        imagePath: './images/tiger.jpg',
        clicks: 0
      },
      {
        name: 'Whiskers',
        imagePath: './images/whiskers.jpg',
        clicks: 0
      }
    ],

    selectedCat: 'Socks'
  };

  const octopus = {
    getAllCats: function() {
      return model.cats;
    },

    selectCatObject: function() {
      const cats = this.getAllCats();
      const selectedCat = model.selectedCat
      return cats.filter(cat => cat.name === selectedCat);
    },

    getSelectedCat: function() {
      const selectedCatObj = this.selectCatObject();
      return selectedCatObj[0];
    },

    setSelectedCat: function(cat) {
      model.selectedCat = cat;
    },

    getCurrentClicks: function() {
      const selectedCatObj = this.selectCatObject();
      return selectedCatObj[0].clicks;
    },

    incrementClicks: function() {
      const selectedCatObj = this.selectCatObject();
      selectedCatObj[0].clicks += 1;
    },

    init: function() {
      listView.init();
      catDetailView.init();
      adminFormView.init();
    }
  };

  const listView = {
    init: function() {
      listView.render();
    },

    render: function() {
      const catListSection = document.querySelector('.cat-list');
      const adminForm = document.querySelector('.admin-form');
      //loop through cats array and attach an LI to cat list UL
      const catsArr = octopus.getAllCats();
      catsArr.forEach(cat => {
        let catItem = document.createElement('li');
        catItem.classList.add('cat-item');
        catItem.innerText = cat.name;
        catListSection.appendChild(catItem);
        catItem.addEventListener('click', (function(catCopy) {
          return function() {
            octopus.setSelectedCat(cat.name);
            adminForm.classList.add('hidden');
            catDetailView.render();
          }
        })(cat.name))
      });
    }
  };

  const catDetailView = {
    init: function() {
      //get current cat and populate details
      this.catName = document.querySelector('.cat-name');
      this.catImage = document.querySelector('.cat-image');
      this.clicks = document.querySelector('.clicks');

      this.catImage.addEventListener('click', function() {
        octopus.incrementClicks();
        catDetailView.render();
      });

      catDetailView.render();
    },

    render: function() {
      currentCat = octopus.getSelectedCat();
      this.catName.innerText = currentCat.name;
      this.catImage.setAttribute("src", currentCat.imagePath);
      this.clicks.innerText = currentCat.clicks;
    }
  };

  const adminFormView = {
    init: function() {
      this.adminBtn = document.querySelector('.admin-btn');
      this.adminForm = document.querySelector('.admin-form');

      this.render();
    },

    render: function() {
      this.currentCat = octopus.getSelectedCat();
      this.cancelBtn = document.querySelector('.admin-btn-cancel');
      this.saveBtn = document.querySelector('.admin-btn-save');
      this.catNameField = document.querySelector('#admin-cat-name');
      this.catImgSrcField = document.querySelector('#admin-cat-img');
      this.catClickField = document.querySelector('#admin-cat-clicks');

      this.adminBtn.addEventListener('click', (function(catCopy) {
        adminFormView.adminForm.classList.toggle('hidden');
        return (function() {
          adminFormView.catNameField.value = currentCat.name;
          adminFormView.catImgSrcField.value = currentCat.imagePath;
          adminFormView.catClickField.value = currentCat.clicks;
        })(adminFormView.currentCat);
      }));

      this.cancelBtn.addEventListener('click', function(e) {
        e.preventDefault();
        adminFormView.adminForm.classList.toggle('hidden');
      });
    }
  };

  octopus.init();

})();
