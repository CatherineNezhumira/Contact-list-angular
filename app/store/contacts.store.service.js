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
        getUpdatedContactData: getUpdatedContactData,
        getError: getError
    };

    clear();
    const serverErrorMessage = 'Internal server error: 500';

    return service;

    function clear() {
        service.contacts = {data: [] };
        service.errorData = {message: ''};
    }

    function getError() {
        return service.errorData.message;
    }

    function init() {
        return readContacts();
    }

    function readContacts() {
        return contactsRepository.getContacts().then(function (result) {
            if (result.status !== 200) {
                service.errorData.message = result.statusText;
            }
            service.contacts.data = result.data;
            return result;
        }).catch(function (error) {
            service.errorData.message = serverErrorMessage;
        });
    }

    function removeContact(id) {
        return contactsRepository.deleteContact(id).then(function (result) {
            if (result.status !== 200) {
                service.errorData.message = result.statusText;
            }
            service.removeContactById(id);
        }).catch(function (error) {
            service.errorData.message = serverErrorMessage;
        });
    }

    function createContact(newContact) {
        return contactsRepository.createContact(newContact).then(function (result) {
            if (result.status !== 201) {
                service.errorData.message = result.statusText;
            }
            service.addNewContact(newContact, result.data);
        }).catch(function (error) {
            service.errorData.message = serverErrorMessage;
        });
    }

    function updateContact(contact) {
        return contactsRepository.updateContact(contact).then(function (result) {
            if (result.status !== 200) {
                service.errorData.message = result.statusText;
            }
            return service.getUpdatedContactData(contact.id);
        }).catch(function (error) {
            service.errorData.message = serverErrorMessage;
        });
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
