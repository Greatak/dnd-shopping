var Shop = (function(win,doc,undefined){

    var items = [];
    function buildItemList(){
        $('.shop-item').forEach(function(d){
            var o = {};
            o.searchText = d.querySelector('.name').textContent.toLowerCase();
            var e = d.querySelector('.tags');
            var t = e.textContent.toLowerCase().split(' ');
            e.textContent = '';
            for(var i = t.length;i--;){
                t[i] = t[i].replace('-',' ');
                o.searchText += ' #' + t[i];
                e.innerHTML += ' <a>#' + t[i] + '</a>';
                e.addEventListener('click',handleTagClick);
            }
            o.element = d;
            e = doc.createElement('div');
            e.className = 'chevron';
            e.addEventListener('click',handleChevron);
            d.appendChild(e);
            items.push(o);
        });
    }
    win.addEventListener('load',buildItemList);

    function handleChevron(e){
        e.target.parentNode.classList.toggle('open');
    }
    function handleTagClick(e){
        $('input')[0].value = e.target.textContent;
        handleSearch({target:{value:e.target.textContent}});   
    }
    function handleClear(){
        $('input')[0].value = '';
        handleSearch({target:{value:''}});
    }
    $('.clear')[0].addEventListener('click',handleClear);
    function handleSearch(e){
        items.forEach(function(d){
            if(!d.searchText.includes(e.target.value)){
                d.element.style.display = 'none';
            }else{
                d.element.style.display = 'block';
            }
        })
    }
    $('input')[0].addEventListener('input',handleSearch);

})(window,document);

function $(what){
    return document.querySelectorAll(what);
}