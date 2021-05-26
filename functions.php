<?php

// a function that adds the time ("?c=1327391739") to the url to force the browser to reload that source. 
// Useful especially for something like favicons since it is quite difficult to get the browser to reload them once they are loaded
function CacheBuster($url){
   $path = pathinfo($url);
   if(filemtime($_SERVER['DOCUMENT_ROOT'].'/'.$url)){
      $ver = '?c='.filectime($_SERVER['DOCUMENT_ROOT'].'/'.$url);
   }else{
      $ver=0;
   }
   if($path['dirname'] == "/") {
       $path['dirname'] = "";
   }
   return $path['dirname'].'/'.$path['basename'].$ver;
}
?>