
define(['app', 'backbone'], function(app, Backbone) {
    return function(records){
      var collection = new Backbone.Collection();
      var databox = {
        // THIS MAP IS USED TO REFECLT THE aoColumnDefs OF THE DATABLES
        // USED FOR getSelectedRows CALL
        columnMap: [
          {name:'instances', column:[
            {id:'2', value:'display_id'},
            {id:'4', value:'image_id'},
            {id:'5', value:'placement'},
            {id:'6', value:'public_dns_name'},
            {id:'7', value:'private_dns_name'},
            {id:'8', value:'key_name'},
            {id:'9', value:'group_name'},
            {id:'11', value:'root_device_name'},
            {id:'12', value:'state'},
            {id:'13', value:'launch_time'},
            {id:'16', value:'ip_address'},
            {id:'17', value:'id'},
            {id:'18', value:'display_id'}]},
          {name:'images', column:[
            {id:'1', value:'display_id'},
            {id:'2', value:'name'},
            {id:'3', value:'id'},
            {id:'4', value:'architecture'},
            {id:'5', value:'description'},
            {id:'6', value:'root_device_type'},
            {id:'10', value:'id'}]},
          {name:'volumes', column:[
            {id:'1', value:'display_id'},
            {id:'2', value:'status'},
            {id:'8', value:'status'},
            {id:'3', value:'size'},
            {id:'4', value:'display_instance_id'},
            {id:'5', value:'display_snapshot_id'},
            {id:'6', value:'zone'},
            {id:'7', value:'create_time'},
            {id:'9', value:'create_time'},
            {id:'10', value:'id'}]},
          {name:'snapshots', column:[
            {id:'1', value:'display_id'},
            {id:'7', value:'status'},
            {id:'3', value:'volume_size'},
            {id:'4', value:'display_volume_id'},
            {id:'9', value:'description'},
            {id:'8', value:'start_time'},
            {id:'10', value:'id'}]},
          {name:'addresses', column:[
            {id:'1', value:'public_ip'},
            {id:'3', value:'instance_id'},
            {id:'4', value:'public_ip'},
            {id:'2', value:'instance_id'}]},
          {name:'keypairs', column:[
            {id:'3', value:'name'}]},
          {name:'sgroups', column: [
            {id:'1', value:'name'},
            {id:'2', value:'description'},
            {id:'6', value:'description'},
            {id:'7', value:'id'}]},
          {name:'scalinggrps', column: [
            {id:'1', value:'name'}]},
          {name:'launchconfigs', column: [
            {id:'1', value:'name'}]},
        ],

        //  THIS MAP IS USED TO REFLECT THE COLUMN IDS BASED ON THE ACTUAL COLUMN LOCATION OF THE DATATABLES
        //  USED FOR SORTING FOR TABLE DISPLAY
        columnMapForSort: [
          {name:'instances', column:[
            {id:'1', value:'display_id'},
            {id:'2', value:'state'},
            {id:'12', value:'state'},
            {id:'3', value:'image_id'},
            {id:'4', value:'availability_zone'},
            {id:'5', value:'public_dns_name'},
            {id:'6', value:'private_dns_name'},
            {id:'7', value:'key_name'},
            {id:'8', value:'group_name'},
            {id:'11', value:'root_device_name'},
            {id:'9', value:'launch_time'},
            {id:'13', value:'launch_time'},
            {id:'16', value:'ip_address'},
            {id:'17', value:'id'},
            {id:'18', value:'display_id'}]},
          {name:'images', column:[
            {id:'1', value:'display_id'},
            {id:'2', value:'name'},
            {id:'3', value:'id'},
            {id:'4', value:'architecture'},
            {id:'5', value:'description'},
            {id:'6', value:'root_device_type'},
            {id:'10', value:'id'}]},
          {name:'volumes', column:[
            {id:'1', value:'display_id'},
            {id:'2', value:'status'},
            {id:'8', value:'status'},
            {id:'3', value:'size'},
            {id:'4', value:'display_instance_id'},
            {id:'5', value:'display_snapshot_id'},
            {id:'6', value:'zone'},
            {id:'7', value:'create_time'},
            {id:'9', value:'create_time'},
            {id:'10', value:'id'}]},
          {name:'snapshots', column:[
            {id:'1', value:'display_id'},
            {id:'2', value:'status'},
            {id:'7', value:'status'},
            {id:'3', value:'volume_size'},
            {id:'4', value:'display_volume_id'},
            {id:'5', value:'description'},
            {id:'9', value:'description'},
            {id:'6', value:'start_time'},
            {id:'8', value:'start_time'},
            {id:'10', value:'id'}]},
          {name:'eips', column:[
            {id:'1', value:'public_ip'},
            {id:'3', value:'instance_id'},
            {id:'4', value:'public_ip'},
            {id:'2', value:'instance_id'}]},
          {name:'keys', column:[
            {id:'1', value:'name'},
            {id:'2', value:'fingerprint'},
            {id:'3', value:'name'}]},
          {name:'sgroups', column: [
            {id:'1', value:'name'},
            {id:'2', value:'description'},
            {id:'6', value:'description'},
            {id:'7', value:'id'}]},
          {name:'scaling', column: [
            {id:'1', value:'name'},
            {id:'2', value:'launch_config_name'},
            {id:'3', value:'instances'},
            {id:'4', value:'desired_capacity'}]},
          {name:'launchconfig', column: [
            {id:'1', value:'name'},
            {id:'2', value:'display_image_id'},
            {id:'3', value:'key_name'},
            {id:'4', value:'security_groups'},
            {id:'5', value:'created_time'}]},
        ],

        sortData: function(){
          records.sort({silent:true});
        },

        sortDataReverse: function(){
            this.sortData();
            records.models = records.models.reverse();
        },

        setComparator: function(comparator){
          records.comparator = comparator;
        },

        sortDataForDataTable: function(page, column_id, order){
          var self = this;
          var sortValue = "";

          //console.log("Sort Page: " + page);
          $.each(this.columnMapForSort, function(idx, map){
            if(map.name === page){
              $.each(map.column, function(index, col){
                if(col.id == column_id){
                  sortValue = col.value;       
                }
              });
            }
          });
 
         // console.log("SortValue: " + sortValue);
          this.setComparator(function(item) {
            return item.get(sortValue) ? item.get(sortValue) : "";
          });

          //console.log("Sorting Order: " + order);
          if( order === "asc" ){
            this.sortData();
          }else{
            this.sortDataReverse();
          }
        },

        getCollection: function(){
          return records;
        },

        getCollectionBySlice: function(start, end){
          //console.log('DATABOX: generate new slice');
          collection.reset(records.slice(start, end));
/* this was change in testing, but removed in EUCA-7736. (9/8/13)
          var updateSlice = _.throttle(function(records, sliced, start, end) {
              console.log('DATABOX: source update');
              sliced.set(records.slice(start, end));
          },500);
          sliced.listenTo(records, 'sync reset add remove', updateSlice(records, sliced, start, end));
*/
          //collection.each(function(v) { console.log(v.get('id')); });
          return collection; 
        }
      };

      return databox;
    };
});

