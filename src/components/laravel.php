<?php

// Add this to your imports
use Illuminate\Support\Str;


// add this anywhaer in you route, not the api, but route.. where you have index, store etc. 

// can be called like: -- $code = uniqueIdGenerator(); --
// then use the $code in your database query

function uniqueIdGenerator(){

// this is the number of character in the uniqueId
$limit = 9;

// now generating the uniquesId 
$uniqid = Str::random(9);

// return the  generated uniqueId
return $uniqid;
}
?>