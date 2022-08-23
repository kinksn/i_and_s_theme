const tab = ( tabItem, tabContent ) => {
    // 要素の取得

    // tabItemに対してクリックイベントを追加
    // クリックした時にtabToggle関数を発火
    for (let i = 0; i < tabItem.length; i++) {
    tabItem[i].addEventListener("click", tabToggle);
    }

    function tabToggle() {
        // tabItemとtabContentの.activeを削除する
        for (let i = 0; i < tabItem.length; i++) {
            tabItem[i].classList.remove("is-active");
        }
        for (let i = 0; i < tabContent.length; i++) {
            tabContent[i].classList.remove("is-active");
        }

        // クリックしたtabItemに.activeを追加
        this.classList.add("is-active");

        // tabItemを配列にする
        // [<li class="tab-item active">About</li>, <li class="tab-item">Works</li>, <li class="tab-item">Contact</li>]
        const aryTabs = Array.prototype.slice.call(tabItem);

        // 配列に格納したキーワードと最初一致したインデックスを格納
        // <li class="tab-item active">About</li>の場合は「0」が返ってくる
        const index = aryTabs.indexOf(this);
        

        // インデックスに対応したtabContentに.activeを追加
        tabContent[index].classList.add("is-active");
    }
}

export default tab;