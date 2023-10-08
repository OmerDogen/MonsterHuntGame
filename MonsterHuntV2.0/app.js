new Vue ({
    el:'#app',
    data:{
      home:true,
      gamebtn:false,
      logVisible:false,
      Logs:[],
      attachedClass:false,
      playerHealth:300, 
      enemyHealth:300,
      logClass:true,
      attackMultiply:30,
      specAttackMultiply:45,
      healMultiply:45,
      logText:{
        playerAttack:' DAMAGE GİVEN TO THE BEAST',
        specAttack: 'SPECİAL ATTACK! ',
        ftlAttack :'FATALİTY! ',
        beastAttack:' DAMAGE RECEİVED FROM THE BEAST',
        heal:' HP RECOVERED FROM HEALİNG POTİON',
        healthFull:' YOUR HEALTH IS FULL!!',
        quit:'You will lose all your progress! Are you sure you want to Give Up?',
        win:'You slayed the Beast! Do you want to play again?',
        lose:'You have been killed! Do you want to play again? '
      }
      
    },
    methods:{
      startGame:function(){
        this.home=false
        this.gamebtn=true
        
      },
      attack:function(){
            this.logVisible=true
             enemydmg = Math.floor(Math.random()*this.attackMultiply)
            this.playerHealth-=enemydmg
            this.addToLog({turn:'m',text:enemydmg + this.logText.beastAttack}
            )
              this.playerAttack()
       },

       specAttack:function(){
            this.logVisible=true
             enemydmg = Math.floor(Math.random()*this.attackMultiply)
            this.playerHealth-=enemydmg
            this.addToLog({turn:'m',text:enemydmg + this.logText.beastAttack}
            )
              this.specPlayerAttack()
                      
      },
      
      
       heal:function(){
          this.logVisible=true
        if (this.playerHealth<300) {
             
             enemydmg = Math.floor(Math.random()*this.attackMultiply)
            this.playerHealth-=enemydmg
            this.addToLog({turn:'m',text:enemydmg +this.logText.beastAttack})
              this.playerHeal()
        }
        else if(this.playerHealth>=300)
        { this.addToLog({turn:'p',text: this.logText.healthFull})  }        
        
       },

        giveUp:function(){
        if (confirm(this.logText.quit)==true) {
          this.playerHealth=300
          this.enemyHealth=300
          this.gamebtn=false
          this.home=true
          this.logVisible=false
          this.Logs=[]
        }
       },
       playerAttack:function () {
         playerdmg = Math.floor(Math.random()*this.attackMultiply)
        this.enemyHealth-=playerdmg
        this.addToLog({turn:'p',text:playerdmg + this.logText.playerAttack})
       },
       specPlayerAttack(){
        playerdmg = Math.floor(Math.random()*this.specAttackMultiply)
        this.enemyHealth-=playerdmg
        if (playerdmg<28) {
          this.addToLog({turn:'p',text:this.logText.specAttack  + playerdmg + this.logText.playerAttack})
          
        }
        else {
          this.addToLog({turn:'p',text:this.logText.ftlAttack  + playerdmg + this.logText.playerAttack})
        }
        
       },
       playerHeal:function(){
        playerHp=Math.floor(Math.random()*this.healMultiply)
        this.playerHealth+=playerHp
        this.addToLog({turn:'h',text:playerHp+ this.logText.heal})
       },
       addToLog:function(log){
        this.Logs.unshift(log)
       }
      
    },
    computed:{
    playerBar:function(){
      return {width:this.playerHealth + 'px'}
    },
    enemyBar:function(){
      return {width:this.enemyHealth + 'px'}
    },
    
    },
    watch:{
      enemyHealth:function(){
        if (this.enemyHealth<= 0) {
          this.enemyHealth=0
          if (confirm(this.logText.win)==true) {
            this.enemyHealth=300,
            this.playerHealth=300,
            this.Logs=[],
            this.logVisible=false
          }
        }
      },
      playerHealth:function(){
        if (this.playerHealth<=0) {
           this.playerHealth=0
          if (confirm(this.logText.lose)==true) {
            this.enemyHealth=300,
            this.playerHealth=300,
            this.Logs=[],
            this.logVisible=false
          }
        }
        else if (this.playerHealth>=300){
          this.playerHealth=300
        }
      }
    }
    
})