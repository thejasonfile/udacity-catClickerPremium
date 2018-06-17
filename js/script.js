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

    getSelectedCat: function() {
      const cats = this.getAllCats();
      const selectedCat = model.selectedCat
      const selectedCatObj = cats.filter(cat => cat.name === selectedCat);
      return selectedCatObj[0];
    },

    setSelectedCat: function(cat) {
      model.selectedCat = cat;
    },

    init: function() {
      listView.init();
      catDetailView.init();
    }
  };

  const listView = {
    init: function() {
      listView.render();
    },

    render: function() {
      catListSection = document.querySelector('.cat-list');
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

      catDetailView.render();
    },

    render: function() {
      currentCat = octopus.getSelectedCat();
      this.catName.innerText = currentCat.name;
      this.catImage.setAttribute("src", currentCat.imagePath);
      this.clicks.innerText = currentCat.clicks;
    }
  };

  octopus.init();

})();
