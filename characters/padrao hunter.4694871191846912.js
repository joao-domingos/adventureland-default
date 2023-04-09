//-----------------------------------------------------------------------

//Ranger

//-----------------------------------------------------------------------
	
    let leader = get_player(character.party);
	
	const merchantName = "idkhtcmerch";

    const characterNames = ["idkhtcode", "idkhtcwarr", "idkhtcprst"];

//--------------------------------------------------------------

	const trashName = ["hpamulet", "hpbelt", "wcap", "wshoes", "ringsj"];

//-----------------------------------------------------------------------

//bagio do pauloinho pra atacar target dotarget

// sets up a victim variable for the person who is getting hit by the mob
	/*var enemy=get_target_of(leader);
	var victim=get_target_of(enemy);*/

//-------------------------------

transferLoot(merchantName);

setInterval(function(){
	transferLoot(merchantName);
	sellTrash();
},20000/1);

//------------------------------------
var attack_mode=true

setInterval(function(){
	
	//auto_party();

	loot();
	
	if(!attack_mode || character.rip || is_moving(character)) return;
	
	/*if (distance(character, leader) > 20) 
    {
        move(
            character.real_x+(leader.x-character.real_x) / 2,
            character.real_y+(leader.y-character.real_y) / 2
        );
    }*/
//--------------------------------------------------------------- 
//3 shot
	
	var targets=[];
for(id in parent.entities)
	if(parent.entities[id].type=="monster" && is_in_range(parent.entities[id],"3shot") && targets.length<3)
		targets.push(parent.entities[id]);
	use_skill("3shot",targets);

//--------------------------
	
	var target=get_targeted_monster();
	if(!target)
	{
		
	/*	if(victim = leader)
        {
            // Sets target as the warriors target
            target=get_target_of(leader);
            set_message(enemy);
        }*/
		
		
		target=get_nearest_monster({min_xp:100,max_att:38});
		

		
		if(target) change_target(target);
		else
		{
			set_message("No Monsters");
			return;
		}
	}
	
	
	if(!is_in_range(target))
	{
		/*
		move(
		character.x+(0.3*character.range)/2,
        character.y+(0.3*character.range)/2
			);
			*/
			
			
		
	}
	
	else if(can_attack(target))
	{
		set_message("Attacking");
		attack(target);
	}
	
//-----------------------------------------------------------------------
	
	//use_hp and use_mp
	
	if (character.hp < 3000)
		
    {
        use('use_hp'); 
	}
	
	/*else if (character.hp <=2636 && !is_on_cooldown('regen_hp'))
	
	{
		use_skill('regen_hp');
				  }*/
	
    if (character.mp < 630)
    {
        use_skill("use_mp");
    }
	
	else if (character.mp <=930 && !is_on_cooldown('regen_mp'))
	
	{
		use_skill('regen_mp');
				  }
	
//--------------------------------------------------------------------
	
	// skill code useless
	
	
//---------------------------------------------------------------------
	
	// code do fe pra kaitar
	
	if(is_in_range(target)){

    if(target.x-character.x >= 0 || target.y-character.y >= 0) 
		
    {
          /*move(character.x-0.2*character.range, character.y-0.2*character.range);
		  */
            
        
    }
	
		
// kait pra baixo / ta agrando os hawk
		
 /*   else 
    {
       
            move(character.x+0.2*character.range, character.y+0.2*character.range);
            
    }
	*/
	
		
    }
	
		
//-----------------------------------------------------------------------

// code name
		
set_message("Idle");
	
//-----------------------------------------------------------------------

//loop

},1000/4); // Loops every 1/4 seconds.

//-----------------------------------------------------------------------

//auto party/problema ao aceitar

/*function auto_party() {
	
	if (!!Object.keys(parent.party).lenght==true) {}
	
	else {
		send_party_invite("idkhtcwarr", "idkhtcprst", "idkhtmerch");
		game_log("amsdfkomkoamsfkosa");
	}
}*/

//-----------------------------------------------------------------------

//auto transfer loot and gold to merch

function transferLoot(merchantName) {
	if (character.ctype === "merchant") return;
	let merchant = get_player(merchantName);
	let keepItems = ["mpot0", "mpot1", "hpot1", "tracker", "poison", "dexring", "monstertoken", "hpamulet", "ringsj", "hpbelt", "wshoes", "bunnyelixir"];
	if (character.ctype !== "merchant"
		&& merchant
		&& merchant.owner === character.owner
		&& distance(character, merchant) < 400) {
		//Transfer Gold
		if (character.gold > 10000) send_gold(merchant, character.gold)
		//Transfer Items
		character.items.forEach((item, index) => {
			if (item && !keepItems.includes(item.name)) {
				send_item(merchant, index, 9999);
				log("Sent items to merchant.");
			}
		});
	}
}

//-----------------------------------------------------------------------

//sell trash

function sellTrash() {
	character.items.forEach((item, index) => {
		if (item
			&& trashName.includes(item.name)
			&& item_grade(item) < 2) {
			log(`selling trash´ ${item.name}`);
			item.q ? sell(index, item.q) : sell(index, item);
		}
	});
}

//-----------------------------------------------------