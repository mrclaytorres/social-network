pragma solidity ^0.5.0;

contract SocialNetwork {
    string public name;
    uint public postCount = 0;
    //mapping allows to store data and saves to the blockchain
    mapping(uint => Post) public posts;

    //create data structure
    struct Post {
        uint id;
        string content;
        uint tipAmount;
        address author;
    }

    event PostCreated (
        uint id,
        string content,
        uint tipAmount,
        address author
    );

    constructor() public {
        name = "Clay Social Network";
    }

    function createPost(string memory _content) public {
        //Require valid content
        require(bytes(_content).length > 0);
        
        //Increment postcount for post ID
        postCount ++;

        //Create the post into the mapping
        posts[postCount] = Post(postCount, _content, 0, msg.sender);

        //Trigger event
        emit PostCreated(postCount, _content, 0, msg.sender);
    }
}