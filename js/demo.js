var box = document.getElementById("box"),
    content = box.getElementsByClassName("content")[0],
    start = document.getElementsByClassName("start")[0],
    score = document.getElementById("score"),
    timer = 0,
    num = 0, // 分数
    speed = 5, // 初始速度
    key = true;
// 添加行以及列
function addRow() {
    var index = Math.floor(Math.random() * 4);
    //添加行
    var rowDiv = document.createElement("div");
    rowDiv.setAttribute("class", "row");
    //添加列
    for (var j = 0; j < 4; j ++) {
        var cellDiv = document.createElement("div");
        rowDiv.appendChild(cellDiv);
        if (j == index) {
            cellDiv.style.backgroundColor = "#000";
            cellDiv.setAttribute("class", "down");
        }
    }
    if (content.children == 0) {
        content.appendChild(rowDiv);
    } else {
        content.insertBefore(rowDiv, content.firstElementChild);
    }
}
//运动函数
function move() {
    if (key) {
        clearInterval(timer);
        timer = setInterval(function() {
            content.style.top = content.offsetTop + speed + "px";
            if (content.offsetTop >= 0) {
                content.style.top = "-150px";
                addRow();
            }
            var len = content.children.length;
            if (len == 6) {
                gameOver();
                content.removeChild(content.lastElementChild);
            }
        }, 25);
    }
}
bindEvent();
function bindEvent() {
    start.onmousedown = function() {
        this.remove();
        addRow();
        move();
    };
    //给box添加点击事件
    // 利用事件委托来绑定事件
    box.onmousedown = function(e) {
        var e = e || window.event;
        if (key) {
            if (e.target.className == "down") {
                e.target.style.backgroundColor = "#fff";
                e.target.removeAttribute("class");
                num ++;
                if (num % 7 == 0) {
                    speed++;
                }
                score.innerHTML = "当前得分：" + num;
            } else if (
                e.target.className != "down" &&
                e.target.tagName == "DIV"
            ) {
                key = false;
                alert("游戏结束,\n当前得分为：" + num);
                clearInterval(timer);
            }
        }
    };
}
// 游戏结束方式：
//1、点击白块时，游戏结束
//2、漏击黑块时，游戏结束
function gameOver() {
    //查找一行当中有没有未点击的，如果有，则游戏结束
    for (var j = 0; j < 4; j++) {
        if (content.children[content.children.length - 1].children[j].className) {
            key = false;
            alert("游戏结束,\n当前得分为：" + num);
            clearInterval(timer);
            return;
        }
    }
}