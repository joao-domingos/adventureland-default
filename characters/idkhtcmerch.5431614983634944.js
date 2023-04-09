setInterval(function(){

if(!is_on_cooldown("fishing")
	&& character.mp>=G.skills.fishing.mp)
	use_skill("fishing");
},1000/4);