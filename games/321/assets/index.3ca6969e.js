const d=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerpolicy&&(s.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?s.credentials="include":r.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}};d();class h{constructor(){this._id=c(),this.createdAt=Date.now(),this.board=new a,this.turnColor="white",this.isGameOver=!1}newGame(){this.newBoard(),this.isGameOver=!1,this.turnColor="white"}newBoard(){this.board=new a}renderBoard(){const e=document.querySelector(".board-container tbody");e.innerHTML="",this.board.value.forEach(t=>{const i=document.createElement("tr");i.classList.add("board-row"),t.forEach(({piece:r,pos:s,isMarked:n})=>{const l=document.createElement("td");l.classList.add("board-cell"),r&&l.classList.add(r),n&&l.classList.add("mark"),l.innerText=r,l.addEventListener("click",()=>this.onCellClick(s)),i.appendChild(l)}),e.appendChild(i)})}onCellClick(e){if(this.isGameOver)return;const{piece:t,isMarked:i}=this.board.getCellByPos(e);if(i){console.log("Im moving!"),this.board.movePiece(e),console.log(this.board),this.renderBoard(),this.passTurn();return}!t||this.turnColor===t&&(this.board.selectedCell=e,this.board.markPossibleMoves(e),this.renderBoard())}passTurn(){this.turnColor==="white"?this.turnColor="black":this.turnColor="white"}}class a{constructor(){this._id=c(),this.createdAt=Date.now(),this.value=this.createBoard(),this.selectedCell=null}createBoard(){const e=[];for(let t=0;t<8;t++){e.push([]);for(let i=0;i<8;i++)e[t].push(this.getNewCell(t,i))}return e}getCellByPos(e){return this.value[e.i][e.j]}markPossibleMoves(e){const{piece:t}=this.getCellByPos(e);for(let i=e.i-1;i<=e.i+1;i++)for(let r=e.j-1;r<=e.j+1;r++){if((i+r)%2!==0||i<0||i>this.value.length||r<0||r>this.value[i].length)continue;const s=this.getCellByPos({i,j:r});s.piece!==t&&(s.isMarked=!0)}}movePiece(e){if(!this.selectedCell)return;const{piece:t}=this.getCellByPos(this.selectedCell);this.setCellPiece(this.selectedCell),this.setCellPiece(e,t),this.clearMarkedCells()}setCellPiece(e,t=""){this.value[e.i][e.j].piece=t}clearMarkedCells(){this.value=this.value.map(e=>e.map(t=>(t.isMarked=!1,t)))}getNewCell(e,t){return{pos:{i:e,j:t},piece:(e+t)%2===0?e<3?"black":e>4?"white":"":"",isMarked:!1}}}function c(o=8){let e="";const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";for(let i=0;i<o;i++)e+=t.charAt(Math.floor(Math.random()*t.length));return e}window.addEventListener("load",u);function u(){new h().renderBoard()}
//# sourceMappingURL=index.3ca6969e.js.map