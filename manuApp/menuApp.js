class Player {
    constructor(name, position) {
        this.name = name;
        this.position = position;
    }

    describe() {
        return `${this.name} plays ${this.position}.`
    }
}


class Team {
    constructor(name) {
        this.name = name;
        this.players = [];
    }

    addPlayer(player) {
        if (player instanceof Player) {
           this.players.push(Player);
        } else {
            throw new Error(`You can only add an instance of player: ${player}`);
        }
    }

    describe() {
        return`${this.name} has ${this.players.length} players.`;
    }
}

class Menu {
    constructor() {
        this.teams = []
        this.selectedTeam = null;
    }

    start() {
        let selection = this.showMainMenuOption();
        while (selection != 0) {
            switch (selection) {
            case '1':
                this.createTeam();
                break;
            case '2':
                this.viewTeam();
                break;
            case '3':
                this.deleteTeam();
                break;
            case '4':
                this.displayTeams();
                break;
            default:
                selection = 0;
            }
            selection = this.showMainMenuOption();
        }
        alert('Goodbye!')
    }

    showMainMenuOption() {
        return prompt(`
        0) exit
        1) create new team
        2) view team
        3) delete team
        4) display all teams
        `);
    }

    showTeamMenuOption(teamInfo) {
        return prompt(`
        0) back
        1) create new player
        2) delete
        ---------------------
        ${teamInfo}
        `)
    }

    displayTeams() {
        let teamString = '';
        for (let i = 0; i < this.teams.length; i++) {
            teamString += i + ') ' + this.teams[i].name + '\n';
        }
        alert(teamString);
    }

    createTeam() {
        let name = prompt('Enter name for new team:');
        this.teams.push(new Team(name));
    }

    viewTeam() {
        let index = prompt('Enter the index of the team you wish to view:');
        if (index > -1 && index < this.teams.length) {
            this.selectedTeam = this.teams[index];
            let description = 'Team Name: ' + this.selectedTeam.name + '\n';

            for (let i = 0; i < this.selectedTeam.players.length; i++) {
                description += i + ') ' + this.selectedTeam.players[i].name 
                    + ' - ' + this.selectedTeam.players[i].position + '\n';
            }

            let selection = this.showTeamMenuOption(description);
            switch (selection) {
                case '1':
                    this.createPlayer();
                    break;
                case '2':
                    this.delectedPlayer();
            }
        }
    
    }
    createPlayer() {
        let name = prompt('Enter name for new player:');
        let position = prompt('Enter position for new player:');
        this.selectedTeam.players.push(new Player(name, position));
    }

    deletePlayer() {
        let index = prompt('Enter the index of the player you wish to delete:');
        if (index > -1 && index < this.selectedTeam.players.length) {
            this.selectedTeam.players.splice(index, 1);
        }
    }
}


let menu = new Menu();
menu.start()