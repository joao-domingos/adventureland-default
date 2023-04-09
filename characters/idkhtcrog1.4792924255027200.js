//-------------------------------
const trashName = ["hpamulet", "hpbelt", "wcap", "ringsj", "stinger"];
//---------------------

setInterval(function(){
	sellTrash();
},10000/1);

//----------------

var attack_mode=true

setInterval(function(){
	loot();
	if(character.max_hp - character.hp > 200 || character.max_mp - character.mp > 300){
		use_hp_or_mp();
	}
	// Party leader
	let leader = get_player(character.party);
	if(!leader){ // Do nothing if your character is not close enough to the leader or not in a party.
		return;
	}
	// Target of leader.
	let target = get_target_of(leader);
	// Attack the target if the target isn't empty and attackable.
	if(target && can_attack(target)){
		attack(target);
	}
	//Move to leader (to limit calls only move when not moving already).
	if(!character.moving){
		move(leader.real_x + 25, leader.real_y);
	}
	set_message("Dpsing");
}, 1000 / 4);

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
