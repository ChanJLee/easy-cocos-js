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

        var num = 10;
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
        if (!this.routes) {
            return;
        }
    
        // update position
        var max = this.routes[0];
        for (var i in this.routes) {
            var sprite = this.routes[i];
            sprite.setPositionY(sprite.getPositionY() - sprite.getComponent("Block").speed);
            if (max.getPositionY() < sprite.getPositionY()) {
                max = sprite;
            }
        }

        // recycler sprite
        for (var i in this.routes) {
            var sprite = this.routes[i];
            if (sprite.getPositionY() <= -this.node.getPositionY() - sprite.getContentSize().height + sprite.getContentSize().width) {
                this.configureBlock(max, sprite, Math.random() > 0.495);
                max = sprite;
            }
        }

        var stack = this.routes.sort(function(lhs, rhs) {
            return lhs.getPositionY() - rhs.getPositionY();
        })

        this.routes = stack;
        this.configureZOrder();
    },
    configureBlock(base, target, right) {
        var offset = base.getContentSize().width / 2;
        target.setPositionX(base.getPositionX() + (right ? offset : -offset) + 0.2);
        target.setPositionY(base.getPositionY() + offset / 2 + 0.2);
    },
    configureZOrder() {
        var playerZOrder = this.routes.length;
        for (var i = 0; i < this.routes.length; ++i) {
            this.routes[i].setLocalZOrder(playerZOrder - i);
        }
        this.player.setLocalZOrder(playerZOrder);
    }
});
