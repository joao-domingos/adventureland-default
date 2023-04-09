
var attack_mode=true

setInterval(function(){

    use_hp_or_mp();
    loot();

    if(!attack_mode || character.rip || is_moving(character)) return;

    var target=["crabx"];
    if(!target)
    {
        target=get_target_of(["idkhtcwarr"]);
        if(target) change_target(target);
        else
        {
            set_message("No Monsters");
            return;
        }
    }
    
    if(!is_in_range(target))
    {
        move(
            character.x+(target.x-character.x)/2,
            character.y+(target.y-character.y)/2
            );
        // Walk half the distance
    }
    else if(can_attack(target))
    {
        set_message("Attacking");
        attack(target);
    }

},1000/4); 