<svelt:head>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css" integrity="sha384-GvrOXuhMATgEsSwCs4smul74iXGOixntILdUW9XmUC6+HX0sLNAK3q71HotJqlAn" crossorigin="anonymous">
</svelt:head>

<script>
//@ts-nocheck
import TopToolbar from './TopToolbar.svelte';
import getNewItem from "../getNewItem";
import Row from './Row.svelte';
  import { onMount } from 'svelte';
  import uuid from "./uuid"
  import PBDItem from "../../app/PBDItem";

// export let just items and currentTime which is required for Editor only
export let items;
export let currentTime=0; //current time if not given is zero ..correct ????
export let setSlideDuration;

export let currentSlideStartTime;
export let imagesDBList;

function manageEqItems(){
  if(!items) return;

   let mainStartingTime = currentSlideStartTime;
// debugger;
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        item.startTime = mainStartingTime;
        item.calcEndTime = item.startTime + item.endTime;
        mainStartingTime = item.calcEndTime;
    }
}

onMount(async () => {
        setInterval(manageEqItems,300);
});

function getItemStartTime(i){

  const rez = PBDItem.getSlideStartTime(i,items);
  return  rez;
  }
  function getItemEndTime(i){
    const rez = PBDItem.getSlideEndTime(i,items);
    return  rez;
}

// the only local variable
let timingsError = false;
let timingsErrorMessage = '';
//////////////////////////////////////////
function setEqType(i,typ) {
  items = items.map((item, index) =>
    index === i
      ? { ...item, itemExtra: { ...item.itemExtra, type: typ } }
      : item
  );
 
}
function moveUpEq(index) {
  if (index > 0) {
    const eqToMove = items[index];
    items = [
      ...items.slice(0, index - 1),
      eqToMove,
      items[index - 1],
      ...items.slice(index + 1),
    ];
  }
}

function moveDownEq(index) {
  if (index < items.length - 1) {
    const eqToMove = items[index];
    items = [
      ...items.slice(0, index),
      items[index + 1],
      eqToMove,
      ...items.slice(index + 2),
    ];
  }
}

function delEq(index) {
  // debugger;
  items = [...items.slice(0, index), ...items.slice(index + 1)];
}


function addEq(i=0) {
  if(items){
    const newItem = {
      uuid: uuid() , //added on 31-may 2024 --not used yet 
      name :"newItem", 
      content :"Text", 
      showAt :0, 
      hideAt :null, 
      startTime: 0,
      endTime: 10,
      code: "Text Item",
      type: "text",
      sp: []
    }
    items = [...items,newItem];
  }
}

////////////////////////////
onMount(async() => {
    //  debugger;
  items;
  // console.log("items changes",items);
    });
////////////////////////////"type": "text","sp": []

</script>

<div class="bg-gray-800 w-full  text-white min-h-screen p-4 m-0 ">

{#if timingsError}
<h1 class="error_div w-full text-center bg-red-800 rounded-md px-2 text-lg">
 Timings Error: {timingsErrorMessage}</h1>
{/if}

  <TopToolbar add={addEq} />
  <!-- title bar -->
  <div class="flex w-full bg-stone-700  justify-center text-lg rounded-md  ">
    <!-- <div class="w-1/12  text-center">Step</div> -->
    <div class="w-1/12  text-center">Start Time</div>
    <div class="w-6/12  text-center">Editor</div>
    <div class="w-4/12  text-center">Display</div>
    <div class="w-1/12  text-center">Side Panel</div>
</div>
<!-- title bar Ends -->

<!-- Rows -->

  <div class="flex flex-col gap-2 my-1 p-1 ">
    
  {#each items  as item, i}

    <Row
 
    {currentTime}  
    {i} 
    bind:item={item} 
    {addEq} 
    {delEq}
    {moveUpEq} 
    {moveDownEq}
    {setEqType}
    {imagesDBList}
    {setSlideDuration}  
    />
  {/each}
  </div>
    
  <!-- oage end -->
</div>

<!-- 204 lines start -->

<style>
  .error_div {
    border: 2px solid yellow;
    margin:8px;
    padding: 2px;
  }
</style>