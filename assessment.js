(function () {
    'use strict';

    // HTML 要素の取得
    const userNameInput = document.getElementById('username');
    const assessmentButton = document.getElementById('assessment');
    const resultDivided = document.getElementById('result-area');
    const tweetDivided = document.getElementById('tweet-area');

    /**
     * 指定した要素の子どもを全て削除する
     * @param {HTMLElement} element HTMLの要素
     */
    function removeAllChildren(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    userNameInput.onkeydown = (event) => {
        if(event.keyCode === 13) {
            assessmentButton.onclick();
        }
    }

    assessmentButton.onclick = () => {
        const userName = userNameInput.value;

        // ガード節
        if (userName.length === 0) {
            return;
        }

        // 診断結果表示エリアの作成
        removeAllChildren(resultDivided);
        const header = document.createElement('h3');
        header.innerText = '診断結果';
        resultDivided.appendChild(header);

        const paragraph = document.createElement('p');
        const result = assessment(userName);
        paragraph.innerText = result;
        resultDivided.appendChild(paragraph);

        // TODO ツイートエリアの作成
        removeAllChildren(tweetDivided);
        const anchor = document.createElement('a');
        const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=' +  encodeURIComponent('あなたにおすすめの都道府県') + '&ref_src=twsrc%5Etfw';
        anchor.setAttribute('href', hrefValue);
        anchor.className = 'twitter-hashtag-button';
        anchor.setAttribute('data-text', result);
        anchor.innerText = 'Tweet #あなたにおすすめの都道府県';
        tweetDivided.appendChild(anchor);
        twttr.widgets.load();
    };

    const answers = [
        '{userName}へのおすすめは、北海道だよ。 {userName}は行ったことあるかな？',
        '{userName}へのおすすめは、青森だよ。 {userName}は行ったことあるかな？',
        '{userName}へのおすすめは、岩手だよ。 {userName}は行ったことあるかな？',
        '{userName}へのおすすめは、宮城だよ。 {userName}は行ったことあるかな？',
        '{userName}へのおすすめは、秋田だよ。 {userName}は行ったことあるかな？',
        '{userName}へのおすすめは、山形だよ。 {userName}は行ったことあるかな？',
        '{userName}へのおすすめは、福島だよ。 {userName}は行ったことあるかな？',
        '{userName}へのおすすめは、茨城だよ。 {userName}は行ったことあるかな？',
        '{userName}へのおすすめは、栃木だよ。 {userName}は行ったことあるかな？',
        '{userName}へのおすすめは、群馬だよ。 {userName}は行ったことあるかな？',
        '{userName}へのおすすめは、埼玉だよ。 {userName}は行ったことあるかな？',
        '{userName}へのおすすめは、千葉だよ。 {userName}は行ったことあるかな？',
        '{userName}へのおすすめは、東京だよ。 {userName}は行ったことあるかな？',
        '{userName}へのおすすめは、神奈川だよ。 {userName}は行ったことあるかな？',
        '{userName}へのおすすめは、新潟だよ。 {userName}は行ったことあるかな？',
        '{userName}へのおすすめは、富山だよ。 {userName}は行ったことあるかな？',
        '{userName}へのおすすめは、石川だよ。 {userName}は行ったことあるかな？',
        '{userName}へのおすすめは、福井だよ。 {userName}は行ったことあるかな？',
        '{userName}へのおすすめは、山梨だよ。 {userName}は行ったことあるかな？',
        '{userName}へのおすすめは、長野だよ。 {userName}は行ったことあるかな？',
        '{userName}へのおすすめは、岐阜だよ。 {userName}は行ったことあるかな？',
        '{userName}へのおすすめは、静岡だよ。 {userName}は行ったことあるかな？',
        '{userName}へのおすすめは、愛知だよ。 {userName}は行ったことあるかな？',
        '{userName}へのおすすめは、三重だよ。 {userName}は行ったことあるかな？',
        '{userName}へのおすすめは、滋賀だよ。 {userName}は行ったことあるかな？',
        '{userName}へのおすすめは、京都だよ。 {userName}は行ったことあるかな？',
        '{userName}へのおすすめは、大阪だよ。 {userName}は行ったことあるかな？',
        '{userName}へのおすすめは、兵庫だよ。 {userName}は行ったことあるかな？',
        '{userName}へのおすすめは、奈良だよ。 {userName}は行ったことあるかな？',
        '{userName}へのおすすめは、和歌山だよ。 {userName}は行ったことあるかな？',
        '{userName}へのおすすめは、鳥取だよ。 {userName}は行ったことあるかな？',
        '{userName}へのおすすめは、島根だよ。 {userName}は行ったことあるかな？',
        '{userName}へのおすすめは、岡山だよ。 {userName}は行ったことあるかな？',
        '{userName}へのおすすめは、広島だよ。 {userName}は行ったことあるかな？',
        '{userName}へのおすすめは、山口だよ。 {userName}は行ったことあるかな？',
        '{userName}へのおすすめは、徳島だよ。 {userName}は行ったことあるかな？',
        '{userName}へのおすすめは、香川だよ。 {userName}は行ったことあるかな？',
        '{userName}へのおすすめは、愛媛だよ。 {userName}は行ったことあるかな？',
        '{userName}へのおすすめは、高知だよ。 {userName}は行ったことあるかな？',
        '{userName}へのおすすめは、福岡だよ。 {userName}は行ったことあるかな？',
        '{userName}へのおすすめは、佐賀だよ。 {userName}は行ったことあるかな？',
        '{userName}へのおすすめは、長崎だよ。 {userName}は行ったことあるかな？',
        '{userName}へのおすすめは、熊本だよ。 {userName}は行ったことあるかな？',
        '{userName}へのおすすめは、大分だよ。 {userName}は行ったことあるかな？',
        '{userName}へのおすすめは、宮崎だよ。 {userName}は行ったことあるかな？',
        '{userName}へのおすすめは、鹿児島だよ。 {userName}は行ったことあるかな？',
        '{userName}へのおすすめは、沖縄だよ。 {userName}は行ったことあるかな？'
    ];

    /**
     * 名前の文字列を渡すと診断結果を返す関数
     * @param {string} userName ユーザーの名前
     * @return {string} 診断結果
     */
    function assessment(userName) {
        // 全文字のコード番号を取得してそれを足し合わせる
        let sumOfcharCode = 0;
        for (let i = 0; i < userName.length; i++) {
            sumOfcharCode += userName.charCodeAt(i);
        }

        // 文字コードの合計を診断結果の数で割って添え字の数値を求める
        const index = sumOfcharCode % answers.length;
        let result = answers[index];

        // {userName} をユーザーの名前に置き換える
        result = result.replace(/\{userName}/g, userName);

        return result;
    }

    // テストコード
    console.assert(
        assessment('太郎') === '太郎へのおすすめは、山梨だよ。 太郎は行ったことあるかな？',
        '診断結果の特定の部分を名前に置き換える処理が正しくありません');
    console.assert(
        assessment('太郎') === assessment('太郎'),
        '入力が同じなら同じ診断結果を出力する処理が正しくありません');

})();