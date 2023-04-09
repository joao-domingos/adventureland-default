const merchantName = "idkhtcmerch";

//--------------------------------------------------------------

	const trashName = ["hpamulet", "hpbelt", "wcap", "wshoes", "ringsj"];

//-----------------------------------------------------------------------

var attack_mode=true

//-------------------------------

setInterval(function(){
	transferLoot(merchantName);
	sellTrash();
},20000/1);

//------------------------------------

setInterval(function(){

	use_hp_or_mp();
	loot();

	if(!attack_mode || character.rip || is_moving(character)) return;

	var target=get_targeted_monster();
	if(!target)
	{
		target=get_nearest_monster({min_xp:100,max_att:24});
		if(target) change_target(target);
		else
		{
			set_message("No Monsters");
			return;
		}
	}
	
	if(!is_in_range(target))
	{
		//move(
			//character.x+(target.x-character.x)/2,
			//character.y+(target.y-character.y)/2
			//);
		// Walk half the distance
	}
	else if(can_attack(target))
	{
		set_message("Attacking");
		attack(target);
	}
	
	use_skill("energize", "idkhtcode", 300)

},1000/4); // Loops every 1/4 seconds.

//-----------------------------------------------------------------------

//auto transfer loot and gold to merch

function transferLoot(merchantName) {
	if (character.ctype === "merchant") return;
	let merchant = get_player(merchantName);
	let keepItems = ["intearring", "handofmidas", "gloves", "mpot0", "mpot1", "hpot1", "tracker", "poison", "dexring", "monstertoken", "hpamulet", "ringsj", "hpbelt", "wshoes", "bunnyelixir"];
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
