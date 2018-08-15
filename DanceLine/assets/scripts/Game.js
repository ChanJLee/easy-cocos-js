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
    },

    start() {
        var sprite = cc.instantiate(this.block);
        sprite.setPositionX(0);
        sprite.setPositionY(-this.node.getPositionY());
        this.node.addChild(sprite);
        this.routes.push(sprite);

        var num = 4;
        for (var i = 0; i < num; ++i) {
            sprite = cc.instantiate(this.block);
            this.configureBlock(this.routes[this.routes.length - 1], sprite, Math.random() > 0.495)
            this.node.addChild(sprite);
            this.routes.push(sprite);
        }

        var hero = cc.instantiate(this.hero);
        this.player = hero;
        hero.setPositionY(50);
        hero.getPositionX(50);
        this.node.addChild(hero);

        this.configureZOrder();
    },

    update(dt) {
        // if (!this.routes) {
        //     return;
        // }
    
        // // update position
        // var max = 1.40129846432481707e-45;
        // for (var i in this.routes) {
        //     var sprite = this.routes[i];
        //     sprite.setPositionY(sprite.getPositionY() - sprite.getComponent("Block").speed);
        //     if (max < sprite.getPositionY()) {
        //         max = sprite.getPositionY();
        //     }
        // }

        // // recycler sprite
        // for (var i in this.routes) {
        //     var sprite = this.routes[i];
        //     if (sprite.getPositionY() <= -this.node.getPositionY() - sprite.getContentSize().height + sprite.getContentSize().width) {
        //         sprite.setPositionY(max + sprite.getContentSize().height - sprite.getContentSize().width);
        //         max = sprite.getPositionY();
        //     }
        // }

        // var stack = this.routes.sort(function(lhs, rhs) {
        //     return lhs.getPositionY() - rhs.getPositionY();
        // })

        // for (var i = 0; i < stack.length; ++i) {
        //     stack[i].setLocalZOrder(i);
        // }
    },
    configureBlock(base, target, right) {
        var offset = base.getContentSize().width / 2;
        target.setPositionX(base.getPositionX() + (right ? offset : -offset) + 0.2);
        target.setPositionY(base.getPositionY() + offset / 2 + 0.2);
    },
    configureZOrder() {
        for (var i = 0; i < this.routes.length; ++i) {
            this.routes[i].setLocalZOrder(this.routes.length - i);
        }
        this.player.setLocalZOrder(this.routes.length);
    }
});
