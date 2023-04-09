var attack_mode=true
var monster_targets = ["crabx"];

setInterval(function(){
	
	load_code("killToLvUp");
    load_code("sendGoldItem");
	use_hp_or_mp();
	loot();

	if(character.rip || is_moving(character)) return;

    
    var target = find_viable_targets()[0];

    if (target != null) {
        if (distance_to_point(target.real_x, target.real_y) < character.range) {
            if (can_attack(target)) {
                attack(target);
            }
		}
        else {
            move(
				character.x+(target.x-character.x)/2,
				character.y+(target.y-character.y)/2
			);
        }
    }
	
				


},1000/4); // Loops every 1/4 seconds.


//Returns the distance of the character to a point in the world.
function distance_to_point(x, y) {
    return Math.sqrt(Math.pow(character.real_x - x, 2) + Math.pow(character.real_y - y, 2));
}

function find_viable_targets() {
    var monsters = Object.values(parent.entities).filter(
        mob => (mob.target == null
                    || parent.party_list.includes(mob.target)
                    || mob.target == character.name)
                && (mob.type == "monster"
                    && (parent.party_list.includes(mob.target)
                        || mob.target == character.name))
                    || monster_targets.includes(mob.mtype));

    for (id in monsters) {
        var monster = monsters[id];

        if (parent.party_list.includes(monster.target)
                    || monster.target == character.name) {
            monster.targeting_party = 1;
        }
        else {
            monster.targeting_party = 0;
        }
    }

    //Order monsters by whether they're attacking us, then by distance.
    monsters.sort(function (current, next) {
        if (current.targeting_party > next.targeting_party) {
            return -1;
        }
        var dist_current = distance(character, current);
        var dist_next = distance(character, next);
        // Else go to the 2nd item
        if (dist_current < dist_next) {
            return -1;
        }
        else if (dist_current > dist_next) {
            return 1
        }
        else {
            return 0;
        }
    });
    return monsters;
}