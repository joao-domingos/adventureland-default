//---------------------------------------------------------------------

//priest

//---------------------------------------------------------------------

    let leader = get_player(character.party);
	
	const merchantName = "idkhtcmerch";

    const characterNames = ["idkhtcode", "idkhtcwarr", "idkhtcprst"];

//---------------------------------------------------------------------
	



var attack_mode=true

setInterval(function(){
	
//---------------------------------
   if (character.hp <= 2000)
    {
        use('regen_hp'); 
	}
	/*else if (character.hp <=2409 && !is_on_cooldown('regen_hp'))
	{
		use_skill('regen_hp');*/
				  
    if (character.mp <= 1995)
    {
        use_skill("use_mp");
    }
	else if (character.mp <=2580 && !is_on_cooldown('regen_mp'))
	{
		use_skill('regen_mp');
				  }
	//-------------------------------
	
    loot();

	if(!attack_mode || character.rip || is_moving(character)) return;

    var target=get_player("idkhtcode");
    if(!target)
    {
        target=get_player("idkhtcode");
        if(target) change_target(target);
        else
        {
            set_message("No Monsters");
            return;
        }
    }

   /* if (distance(character, leader) > 5) 
    {
        move(
            character.real_x+(leader.x-character.real_x) / 2,
            character.real_y+(leader.y-character.real_y) / 2
        );
    }*/
	
    else if(can_heal(target))
    {
        set_message("Healing");
        heal(target);
    }

	
	if(target.hp/target.max_hp < 0.5)
    use_skill("skill_pheal");
	
	if("idkhtcode".hp/"idkhtcode".max_hp < 0.6)
		use_skill("skill_pheal")

},1000/4);

//------------------------------------------------------------------------