angular
    .module('myApp')
    .factory('contactsStore', contactsStore);

function contactsStore(contactsRepository) {

    var service = {
        clear: clear,
        readContacts: readContacts,
        init: init,
        updateContact: updateContact,
        createContact: createContact,
        removeContact: removeContact,
        filterContacts: filterContacts,
        addNewContact: addNewContact,
        removeContactById: removeContactById,
        getUpdatedContactData: getUpdatedContactData
    };

    clear();
    return service;

    function clear() {
        service.contacts = {data: [] };
    }

    function init() {
        return readContacts();
    }

    function readContacts() {
        return contactsRepository.getContacts().then(function (result) {
            if (result) {
                service.contacts.data = result.data;
            }
            return result;
        });
    }

    function removeContact(id) {
        return contactsRepository.deleteContact(id);
    }

    function createContact(newContact) {
        return contactsRepository.createContact(newContact);
    }

    function updateContact(contact) {
        return contactsRepository.updateContact(contact);
    }

    function filterContacts(filterData) {
        return filterData ? service.contacts.data.filter(function (contact) {
                return contact.name.includes(filterData);
            }) : service.contacts.data;
    }

    function addNewContact(newContact, id) {
        newContact.id = id;
        service.contacts.data.push(newContact);
    }

    function removeContactById(id) {
        const contactIdToDelete = service.contacts.data.indexOf(service.contacts.data.find(function (contact) {
            return contact.id === id;
        }));
        service.contacts.data.splice(contactIdToDelete, 1);
    }

    function getUpdatedContactData(editContactId) {
        return service.contacts.data.find(function (contact) {
            return contact.id === editContactId;
        });
    }

}
