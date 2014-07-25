/**
 * Created by maxwellzirbel on 7/24/14.
 */
define(function(require, exports, module) {
    // import dependencies
    var Engine = require('famous/core/Engine');
    var Modifier = require('famous/core/Modifier');
    var Transform = require('famous/core/Transform');
    var ImageSurface = require('famous/surfaces/ImageSurface');
    var StateModifier = require('famous/modifiers/StateModifier');

    // create the main context
    var mainContext = Engine.createContext();

    var contextSize;
    Engine.nextTick(function(){ contextSize = mainContext.getSize(); run();});


    function createSurface(animate, content, x, y) {
        var surface = new ImageSurface({
            size: [100, 100],
            content: content,
            classes: ['double-sided'],
            properties: {
                borderRadius: '100px'
            }
        });
        var stateModifier = new StateModifier({
            origin: [0.5, 0.5]
        });

        var initialTime = Date.now();
        var centerSpinModifier = new Modifier({
            origin: [0.5, 0.5],
            transform : function(){
                return Transform.rotateY(.002 * (Date.now() - initialTime));
            }
        });

        mainContext.add(stateModifier).add(centerSpinModifier).add(surface);

        stateModifier.setTransform(
            Transform.translate(x, y, 0),
            { duration : 1000, curve:  animate }
        );
    }

    function run() {
        var contentArr = ['http://photos4.meetupstatic.com/photos/member/1/1/6/e/member_205024462.jpeg',
            'https://pbs.twimg.com/profile_images/481892906555277314/qcU5KMDk_normal.jpeg',
            'https://pbs.twimg.com/profile_images/478942095969751040/MdVWYCei_normal.jpeg',
            'https://avatars2.githubusercontent.com/u/7228347?s=400',
            'http://m.c.lnkd.licdn.com/mpr/pub/image-Hqa9sez7TohQIR-3A_FowGzFPtrAJnTg5-ao97z74T9AozwgHqao1I3IhhpGJ3XNNew/aleksander-bordvik.jpg',
            'http://codinghouse.co/images/team/nickjames.jpg',
            'http://codinghouse.co/images/team/oswald.jpg',
            'https://pbs.twimg.com/profile_images/471502438399483904/S56RLXsa.jpeg',
            'https://pbs.twimg.com/profile_images/448575810585493504/vddHDm-o.jpeg',
            'https://media.licdn.com/media/p/3/005/074/172/06a362a.jpg',
            'https://pbs.twimg.com/profile_images/483841456927281152/79HExfSZ.jpeg'
        ];

        var animations = ['linear', 'easeIn', 'easeOut', 'easeInOut',
            'easeOutBounce', 'spring'
        ];

        for(var i = 0; i < 22; i++) {
            var x = Math.random() * ((contextSize[0] /2) * Math.sin(i)) - Math.sin(i);
            var y = Math.random() * ((contextSize[1] /2) * Math.cos(i)) - Math.cos(i);
            var content = contentArr[i % contentArr.length];
            var animate = animations[i % animations.length];
            createSurface(animate, content, x, y);
        }

    }
});