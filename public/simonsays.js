
//Num. numLevels
const numLevels = 15
// Random keys generation
let keys = keyGenerator(numLevels)

// getting htmls elements to handle views
let title = document.getElementById('title')
let keyword = document.getElementById('keyword')

// Inits game
function startGame(){
    title.className ='title'
    keyword.classList.add('active')
    nextLevel(0)
}

// Next Level Function
function nextLevel(currentLevel){

    if(currentLevel == numLevels){
      return swal({title:'you are the winner!',type:'success'})
    }

// creates events on keys
    initClickEvents = function(){
      for(let e=65; e<=90;e++){
        const objDiv = document.getElementById(e)
        objDiv.addEventListener('click',onEventTrigger)
      }
    }
// removes events on keys
    endClickEvents = function(){
      for(let e=65; e<=90;e++){
        const objDiv = document.getElementById(e)
        objDiv.removeEventListener('click',onEventTrigger)
      }
    }

// Current level message
    swal({timer:1000, title: `Nivel ${currentLevel + 1 }`, showConfirmButton:false} )

    for(let i=0; i<=currentLevel; i++){
      setTimeout(()=>  activate(keys[i]),1000*(i+1)+1000)
    }

   let i = 0
   //
   let currentKey = keys[i]

   initClickEvents()
   window.addEventListener('keydown',onEventTrigger)

    function onEventTrigger (ev){
          let keyCode
          if(ev.target.id) keyCode = ev.target.id
          else keyCode=ev.keyCode;

          if(keyCode == currentKey){
            activate(currentKey, {success:true})
            i++
            if(i > currentLevel){
              window.removeEventListener('keydown',onEventTrigger)
              endClickEvents()
              setTimeout(()=>nextLevel(i),1500)
            }
            currentKey = keys[i]

          } else {
                  activate(keyCode,{fail:true})
                  window.removeEventListener('keydown',onEventTrigger)
                  endClickEvents()
                  swal({title:'Perdiste:(', text:'¿Do you want to play again?',
                        showCancelButton : true,
                        confirmButtonText: 'Sí',
                        cancelButtonText : 'No',
                        closeOnConfirm  : true
                       },
                        function(ok){
                          if(ok){
                            keys = keyGenerator(numLevels)
                            nextLevel(0)
                          }
                        })
          }
   }

}


function keyGenerator(numLevels){
  return new Array(numLevels).fill(0).map(generateRandomKey)
        }

function generateRandomKey(){
    const min = 65
    const max = 90
    return Math.round(Math.random()*(max-min) + min)
}

function getElementByKeyCode(keyCode){
    return document.querySelector(`[data-key="${keyCode}"]`)
  }
function activate(keyCode, opts = {}){
    const el = getElementByKeyCode(keyCode)
    el.classList.add('active')
    if(opts.success){
      el.classList.add('success')
    } else if(opts.fail){
      el.classList.add('fail')
    }
    setTimeout(()=>deactivate(el),500)
}
function deactivate( el){
  el.className = 'key'
}
