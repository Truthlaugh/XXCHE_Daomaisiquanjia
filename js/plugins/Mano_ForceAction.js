//=============================================================================
// Mano_ForceAction.js
// ----------------------------------------------------------------------------
// Copyright (c) 2018-2018 Sigureya
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/Sigureya/
// [github]:https://github.com/Sigureya/RPGmakerMV
//=============================================================================

/*:
 * @plugindesc 戦闘行動の強制を変数で指定します。
 * フォースの守りがあらんことを。
 * 
 * @param subject
 * @desc スキルの使用者を選択する変数を
 * @type variable
 * 
 * @param skill
 * @desc 使用するスキルを選択する変数
 * @type variable
 * 
 * @param target
 * @desc 使用するスキルの攻撃対象を選択する変数
 * @type variable
 * 
 * @help
 * 数値を設定した変数に入れます
 * それからプラグインコマンドで「execForceAction」と入れます。
 * 以上です。
*/

(function(){
    'use strict'
const setting =(function(){
    const param = PluginManager.parameters("Mano_ForceAction");
    const result ={
        target:Number(param.target),
        skill:Number(param.skill),
        subject:Number(param.subject)
    };
    return result;
})()
if(!setting.target || !setting.skill || !setting.subject){
    console.log("パラメータ設定忘れあるよ")
    return;
}
/**
 * 
 * @param {Number} userIndex 
 * @param {Number} skillId 
 * @param {Number} targetIndex 
 */
function setForceActionByEnemy(userIndex,skillId,targetIndex){
    const enemy= $gameTroop.members()[userIndex];
    if(enemy){
        enemy.forceAction(skillId,targetIndex);
    }
}
const Game_Interpreter_pluginCommand=Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand =function(command,args){
    if(command ==='execForceAction'){
        const user = $gameVariables.value(setting.subject);
        const skill = $gameVariables.value(setting.skill);
        const target = $gameVariables.value(setting.target);
        setForceActionByEnemy(user,skill,target);
        return;
    }

    Game_Interpreter_pluginCommand.call(this,command,args);
};



})()