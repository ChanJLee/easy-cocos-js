// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        hero: {
            default: null,
            type: cc.Prefab
        },

        block: {
            default: null,
            type: cc.Prefab
        },
        routes: [],
        player: null,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // enable collision manager
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;


        // register event
        // release routes
        // release player
    },

    start() {
        // do nothing
        var y = -this.node.getPositionY();
        for (var i = 0; i < 5; ++i) {
            var sprite = cc.instantiate(this.block);
            sprite.setPositionX(0);
            sprite.setPositionY(y);
            sprite.setLocalZOrder(0);
            this.node.addChild(sprite);
            y += (sprite.getContentSize().height - sprite.getContentSize().width);
            this.routes.push(sprite);
        }

        var hero = cc.instantiate(this.hero);
        this.player = hero;
        hero.setPositionY(50);
        hero.getPositionX(50);
        hero.setLocalZOrder(1);
        this.node.addChild(hero);
    },

    update(dt) {
        if (!this.routes) {
            return;
        }
    
        var max = 1.40129846432481707e-45;
        for (var i in this.routes) {
            var sprite = this.routes[i];
            sprite.setPositionY(sprite.getPositionY() - sprite.getComponent("Block").speed);
            if (max < sprite.getPositionY()) {
                max = sprite.getPositionY();
            }
        }

        for (var i in this.routes) {
            var sprite = this.routes[i];
            if (sprite.getPositionY() <= -this.node.getPositionY() - sprite.getContentSize().height + sprite.getContentSize().width) {
                sprite.setPositionY(max + sprite.getContentSize().height - sprite.getContentSize().width);
                max = sprite.getPositionY();
            }
        }

        var stack = this.routes.sort(function(lhs, rhs) {
            return lhs.getPositionY() - rhs.getPositionY();
        })

        for (var i = 0; i < stack.length; ++i) {
            stack[i].setLocalZOrder(i);
        }
    },
});
