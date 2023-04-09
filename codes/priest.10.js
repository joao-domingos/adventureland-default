// Hey there!
// This is CODE, lets you control your character with code.
// If you don't know how to code, don't worry, It's easy.
// Just set attack_mode to true and ENGAGE!

var attack_mode=false

setInterval(function(){

	use_hp_or_mp();
	loot();

	if(character.rip || is_moving(character)) return;

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


},1000/4); // Loops every 1/4 seconds.

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

//Returns the distance of the character to a point in the world.
function distance_to_point(x, y) {
    return Math.sqrt(Math.pow(character.real_x - x, 2) + Math.pow(character.real_y - y, 2));
}