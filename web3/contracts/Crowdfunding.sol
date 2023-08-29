// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Crowdfunding {
    struct Project {
        address creator;
        string title;
        string description;
        uint target;
        uint currentAmount;
        uint deadline;
        bool completed;
        bool expired;
        string image;
        uint256 projectId;
    }

    Project[] public projects;
    mapping(uint256 => mapping(address => uint256)) public donations;
    mapping(uint256 => address[]) public projectDonators;

    event DonationMade(uint256 indexed projectId, address indexed donor, uint256 amount);
    event ProjectCompleted(uint256 indexed projectId, uint256 totalAmount);
    event ProjectExpired(uint256 indexed projectId);

    modifier onlyCreator(uint256 _projectId) {
        require(msg.sender == projects[_projectId].creator, "Only the project creator can perform this action");
        _;
    }

    function createProject(string memory _title, string memory _description, uint _target, uint _deadline, string memory _image) public {
        require(_target > 0, "Target must be greater than zero");
        require(_deadline > block.timestamp, "Deadline must be in the future");

        uint256 projectId = projects.length;

        Project memory newProject = Project({
            creator: msg.sender,
            title: _title,
            description: _description,
            target: _target,
            currentAmount: 0,
            deadline: _deadline,
            completed: false,
            expired: false,
            image : _image,
            projectId: projectId
        });

        projects.push(newProject);
    }

    function donate(uint256 _projectId) public payable {
        require(_projectId < projects.length, "Project does not exist");

        Project storage project = projects[_projectId];

        require(!project.completed && !project.expired, "Project is already completed or expired");
        require(block.timestamp <= project.deadline, "Project has expired");
        require(msg.value > 0, "Donation amount must be greater than zero");

        project.currentAmount += msg.value;

        donations[_projectId][msg.sender] += msg.value;

        projectDonators[_projectId].push(msg.sender);

        emit DonationMade(_projectId, msg.sender, msg.value);

        if (project.currentAmount >= project.target) {
            project.completed = true;
            emit ProjectCompleted(_projectId, project.currentAmount);
        } else if (block.timestamp > project.deadline) {
            project.expired = true;
            emit ProjectExpired(_projectId);
        }
    }

    function closeProject(uint256 _projectId) public onlyCreator(_projectId) {
        require(_projectId < projects.length, "Project does not exist");

        Project storage project = projects[_projectId];

        require(!project.completed && !project.expired, "Project is already completed or expired");

        project.completed = true;

        emit ProjectCompleted(_projectId, project.currentAmount);
    }

    function getProjects() public view returns (Project[] memory) {
        return projects;
    }

    function getDonators(uint256 _projectId) public view returns (address[] memory) {
        require(_projectId < projects.length, "Project does not exist");
        return projectDonators[_projectId];
    }
}
