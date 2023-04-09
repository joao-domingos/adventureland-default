
setInterval(function(){

	use_hp_or_mp();
	loot();

	var lowest_health = lowest_health_partymember();
	
    //If we have a target to heal, heal them. Otherwise attack a target.
    if (lowest_health != null && lowest_health.health_ratio < 0.8) {
        if (distance_to_point(lowest_health.real_x, lowest_health.real_y) < character.range) {
            heal(lowest_health);
        }
        else {
            move_to_target(lowest_health);
        }
    }
    else {

        var target = find_viable_targets()[0];

        if (target != null) {
            if (distance_to_point(target.real_x, target.real_y) < character.range) {
                if (can_attack(target)) {
                    attack(target);
                }
            }
            else {
                move_to_target(target);
            }
        }
		else
		{
			if (!smart.moving) {
				game_log("finding a target");
            	smart_move({ to: monster_targets[0] });
        	}
		}
    }
},1000/4); 

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

//Returns the party member with the lowest hp -> max_hp ratio.
function lowest_health_partymember() {
    var party = [];
    if (parent.party_list.length > 0) {
		for(id in parent.party_list)
		{
			var member = parent.party_list[id];
			
			var entity = parent.entities[member];
			
			if(member == character.name)
			{
				entity = character;
			}
			
			if(entity != null)
			{
				party.push({name: member, entity: entity});
			}
		}
    }
	else
	{
		//Add Self to Party Array
		party.push(
		{
			name: character.name,
			entity: character
		});
	}

    //Populate health percentages
    for (id in party) {
        var member = party[id];
        if (member.entity != null) {
            member.entity.health_ratio = member.entity.hp / member.entity.max_hp;
        }
        else {
            member.health_ratio = 1;
        }
    }
	
    //Order our party array by health percentage
    party.sort(function (current, next) {
        return current.entity.health_ratio - next.entity.health_ratio;
    });
	

    //Return the lowest health
    return party[0].entity;
}
