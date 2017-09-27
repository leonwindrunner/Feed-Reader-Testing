/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('each feed has a defined URL and it\'s not empty', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBeNull();
                expect(allFeeds[i].url).toMatch(/http/);
            }
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('each feed has a defined name and it\'s not empty', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toBeNull();
                expect(allFeeds[i].name[0]).toBeDefined();
            }
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        var menu, menuClass;

        beforeEach(function() {
            menu = document.querySelector('body');
            menuClass = menu.className;
        });

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function() {
            expect(menuClass).toMatch(/menu-hidden/);
        });

        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('changes visibility when the menu icon is clicked', function() {
            var menuIcon = $('.menu-icon-link');
            menuIcon.click();
            menuClass = menu.className; //get body's classname again
            expect(menuClass).not.toMatch(/menu-hidden/);
            menuIcon.click();
            menuClass = menu.className; //get body's classname again
            expect(menuClass).toMatch(/menu-hidden/);
        });
    });



    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            var num = Math.floor(Math.random() * allFeeds.length); //get a random number from 0 to 3
            // console.log(num);
            loadFeed(num, function() { //it will randomly load feed from arry allFeeds
                done();
            });
        });

        it('at least have a single .entry element within the .feed container when loadFeed function is called and completes its work', function(done) {
            var elements = $(".feed .entry");
            expect(elements.length).toBeGreaterThan(0);
            // console.log(elements.length);
            done();
        });
    });



    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var oldFeed;

        // Shuffle function, get a random number array like [2,1,3,0]
        beforeEach(function(done) {
            function shuffle(array) {
                var currentIndex = array.length,
                    temporaryValue, randomIndex;
                while (currentIndex !== 0) {
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex -= 1;
                    temporaryValue = array[currentIndex];
                    array[currentIndex] = array[randomIndex];
                    array[randomIndex] = temporaryValue;
                }
                return array;
            }

            var numArry = [];
            for (let i = 0; i < allFeeds.length; i++) {
                numArry[i] = i;
            }
            numArry = shuffle(numArry);

            var num1 = numArry[0];
            var num2 = numArry[1];
            // console.log(numArry);

            //load feed two times, randomly load from array allFeeds
            loadFeed(num1, function() {
                oldFeed = $('.feed').html(); //first time get feed's innerHTML
                loadFeed(num2, function() {
                    done();
                });
            });
        });

        it('is loaded by the loadFeed function that the content actually changes.', function(done) {
            var newFeed = $('.feed').html(); //second time get feed's innerHTML
            var compareFeed = (newFeed == oldFeed);
            expect(compareFeed).toBe(false);
            done();
        });
    });
}());