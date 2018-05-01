const Alexa = require('alexa-sdk');

var watchList = [];

const courses = [
    {
        name: 'Angular Fundamentals',
        teaser: 'When it was first released, Angular turned the world of front-end development upside down. It was one of the first modern JavaScript frameworks, and the...',
        description: '',
        author: 'Dan Wellman',
        duration: '8.9 hours'
    },
    {
        name: 'Upgrade to Java 8 for Android App Development',
        teaser: 'Java 8, a more elegant and less verbose version of the Java programming language, was released in early 2014. Until recently, though, Android app developers...',
        description: '',
        author: 'Ashraff Hathibelagal',
        duration: '37 minutes'
    },
    {
        name: 'Code a Single-Page App With Laravel and Vue.js',
        teaser: 'Web users like single-page applications because they are more fluid and responsive. If you want to add more responsiveness and interactivity to your',
        description: '',
        author: 'Jeremy McPeak',
        duration: '2.1 hours'
    },
    {
        name: 'First Look at WordPress Gutenberg',
        teaser: 'Gutenberg is a brand-new editing interface for WordPress. Gutenberg is a major change coming to WordPress 5 this year, and it will affect WordPress plugin...',
        description: '',
        author: 'Rachel McCollin',
        duration: '10 minutes'
    },
    {
        name: 'Code a Front-End App With GraphQL and React',
        teaser: 'GraphQL is an emerging technology for creating APIs and sharing data between the server and front-end. It was originally designed by engineers at Facebook,...',
        description: '',
        author: 'Markus Mühlberger',
        duration: '50 minutes'
    },
    {
        name: 'Learn PHP for WordPress',
        teaser: 'WordPress makes it easy to create content-rich websites, with powerful admin pages and the easy-to-use Customizer. However, there will come a time when the...',
        description: '',
        author: 'Rachel McCollin',
        duration: '2 hours'
    },
    {
        name: 'Create a Free Website With GitHub Pages',
        teaser: "Have you ever wanted to build a simple website quickly and easily, without a lot of fuss? It's easy to code some HTML, CSS, and JavaScript to promote...",
        description: '',
        author: 'Derek Jensen',
        duration: '50 minutes'
    },
    {
        name: 'Code a Registration Form Using Bootstrap and jQuery',
        teaser: 'Almost every web app is going to need a registration form. A user-friendly form for a modern web site or web app should be responsive—looking good whether...',
        description: '',
        author: 'Annapurna Agrawal',
        duration: '1.5 hours'
    },
    {
        name: 'Enhance Your Laravel App With Vue.js',
        teaser: 'Laravel is a great framework for building PHP web apps, making it easy to get started and to deliver a solid product. To take the user experience to the next...',
        description: '',
        author: 'Jeremy McPeak',
        duration: '1.7 hours'
    },
    {
        name: 'Build APIs With GraphQL',
        teaser: 'RESTful APIs are great: they follow a resource-oriented approach that is clear and well structured. But when the data gets more and more complex, the routes...',
        description: '',
        author: 'Markus Mühlberger',
        duration: '1.1 hours'
    },
    {
        name: 'Build a CMS With Laravel',
        teaser: 'Laravel is a PHP framework for modern web apps. Now on version 5, it’s a mature system that continues to win support due to its elegance and stability....',
        description: '',
        author: 'Jeremy McPeak',
        duration: '4.3 hours'
    },
    {
        name: 'Build a Web App With the Flask Microframework for Python',
        teaser: 'Whether you need to create a quick website for a friend, a flexible web service for a client or a large, enterprise application, Flask is worth checking out....',
        description: '',
        author: 'Derek Jensen',
        duration: '2.1 hours'
    }
];


const handlers = {
    'GetNewCourses': function () {
        var coursesResponse = 'Here are the new courses that I see: ';
        const newCourses = courses.map(c => `${c.name} by ${c.author}`).join(', ');
        coursesResponse += newCourses;

        this.emit(':tell', coursesResponse);
    },
    'GetCourseTeaser': function() {
        const intentObj = this.event.request.intent;
        const selectedCourses = courses.filter(function(c) {
            return c.name.toLowerCase().startsWith(intentObj.slots.course_name.value.toLowerCase());
        });

        if(selectedCourses.length == 0) {
            this.emit(':tell', `Sorry, I couldn't find the course ${intentObj.slots.course_name.value}`);
        }else {
            const course = selectedCourses[0];
            this.emit(':tell', `The teaser for ${course.name} by ${course.author} is as follows: ${course.teaser}`);
        }
    },
    'AddToWatchList': function() {
        const intentObj = this.event.request.intent;
        const selectedCourses = courses.filter(function(c) {
            return c.name.toLowerCase().startsWith(intentObj.slots.course_name.value.toLowerCase());
        });

        if(selectedCourses.length == 0) {
            this.emit(':tell', `Sorry, I couldn't find the course ${intentObj.slots.course_name.value}`);
        }else {
            const course = selectedCourses[0];
            if(watchList.indexOf(course) < 0) {
                watchList.push(course);
                this.emit(':tell', `The course ${course.name} by ${course.author} has been added to your watch list.`);
            }else {
                this.emit(':tell', `The course ${course.name} by ${course.author} already exists in your watch list.`);
            }
        }
    },
    'GetWatchList': function() {
        if(watchList.length == 0) {
            this.emit(':tell', 'There are currently no courses in your watch list.');
        }else {
            var watchListResponse = 'Here are the courses on your watch list: ';
            const watchListCourses = watchList.map(c => `${c.name} by ${c.author}`).join(', ');
            watchListResponse += watchListCourses;

            this.emit(':tell', watchListResponse);
        }
    }
};

exports.handler = function(event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.appId = 'amzn1.ask.skill.c0c5be89-aa87-4603-ae6c-ad9146f565bf';
    alexa.registerHandlers(handlers);
    alexa.execute();
};