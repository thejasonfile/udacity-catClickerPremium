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

  };

  const octopus = {
    getAllCats: function() {
      return model.cats;
    },

    init: function() {
      listView.init();
    }
  };

  const listView = {
    init: function() {
      const catList = document.querySelector('.cat-list');
      //test for cat list
      if (!catList) {
        // if no cat list UL, build it
        const sectionList = document.querySelector('.section-list');
        const catList = document.createElement('ul');
        catList.classList.add('cat-list');
        sectionList.appendChild(catList);

        //loop through cats array and attach an 'LI' to cat list UL
        const catsArr = octopus.getAllCats();
        catsArr.forEach(cat => {
          let catItem = document.createElement('li');
          catItem.classList.add('cat-item');
          catItem.innerText = cat.name;
          catList.appendChild(catItem);
        })
      }
    }
  };

  const catDetailView = {

  };

  octopus.init();

})();
