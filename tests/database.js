// const assert = require('assert');
// const index = require('../database/index');


describe('save',function(){
  var char;
    //save to database to see it is saving or not
	it('save to database',function(done){
    	char = new Student.Student({
     		Name: 'Someone',
      		HomeWork:'Javascript',
    	});
    	char.save().then(function(){
      	assert(!char.isNew);
      	done();
    	});

	});

//delete one from the database to check if you can remove specific one
	it('Delete specific one from the database', function(done){
    	index.index.findOneAndRemove({Name: 'Someone'}).then(function(){
            index.index.findOne({Name: 'Yahye'}).then(function(result){
        		assert(result === null);
        		done();
      		});
    	});
  	});

  //update one 
  it('Updates the saved data', function(done){
        index.index.findOneAndUpdate({Name: 'Someone'}, {Name: 'Thisone'}).then(function(){
            index.index.findOne({_id: char._id}).then(function(result){
                assert(result.Name === 'None');
                done();
          });
      });
  });



});