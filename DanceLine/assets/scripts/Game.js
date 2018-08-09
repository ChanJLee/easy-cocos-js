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
        routes: []
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
        for (var i = 0; i < 10; ++i) {
            var sprite = cc.instantiate(this.block);
            sprite.setPositionX(0);
            sprite.setPositionY(y);
            this.node.addChild(sprite);
            y += sprite.getContentSize().width;
            this.routes.push(sprite);
        }

    },

    update(dt) {
        // check if player collision
        for (var i in this.routes) {
            var sprite = this.routes[i];
            sprite.setPositionY(sprite.getPositionY() + 2);
        }
    },

    writeObj(obj) {
        var description = "";
        for (var i in obj) {
            var property = obj[i];
            description += i + " = " + property + "\n";
        }
        return description;
    },
});
