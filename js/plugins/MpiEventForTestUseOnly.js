//==============================================================================
// MpiEventForTestUseOnly.js
//==============================================================================

/*:
 * @plugindesc テスト実行時のみ実行可能なイベントを設定します。
 * @author 奏ねこま（おとぶき ねこま）
 * 
 * @help 
 * [概要]
 *  イベントのメモ欄に特定の記述をすることで、デプロイメントした後の通常のゲーム
 *  実行時には出現しないようにします。これにより、テスト用に作ったイベントをその
 *  まま完成版としてリリースしても実行されるのを防ぐことができます。
 * 
 * [使い方]
 *  テスト実行専用にしたいイベントのメモ欄に、下記のように記述してください。
 * 
 *   <test>
 * 
 * [利用規約] ..................................................................
 *  - 本プラグインの利用は、RPGツクールMV/RPGMakerMVの正規ユーザーに限られます。
 *  - 商用、非商用、有償、無償、一般向け、成人向けを問わず、利用可能です。
 *  - 利用の際、連絡や報告は必要ありません。また、製作者名の記載等も不要です。
 *  - プラグインを導入した作品に同梱する形以外での再配布、転載はご遠慮ください。
 *  - 本プラグインにより生じたいかなる問題についても、一切の責任を負いかねます。
 * [改訂履歴] ..................................................................
 *   Version 1.00  2018/12/19  初版
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 *  Web Site: http://makonet.sakura.ne.jp/rpg_tkool/
 *  Twitter : https://twitter.com/koma_neko
 *  Copylight (c) 2018 Nekoma Otobuki
 */

var Imported = Imported || {};
var Makonet = Makonet || {};

(function(){
    'use strict';

    var plugin = 'MpiEventForTestUseOnly';

    Imported[plugin] = true;
    Makonet[plugin] = {};

    var $mpi = Makonet[plugin];
    $mpi.parameters = PluginManager.parameters(plugin);

    //==============================================================================
    // Game_Map
    //==============================================================================

    // Game_Map.prototype.setupEvents
    (function(o,p){
        var f=o[p];o[p]=function(){
            f.apply(this,arguments);
            if (!$gameTemp.isPlaytest()) {
                this._events = this._events.filter(function(event) {
                    return !event.event().meta['test'];
                });
                this.refreshTileEvents();
            }
        };
    }(Game_Map.prototype,'setupEvents'));
}());
