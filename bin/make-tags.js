#!/usr/bin/env node
'use strict';

let exec  = require('child_process').exec;
let execSync  = require('child_process').execSync;
let path = require('path');

process.chdir(__dirname);

// retrieve git root dir and forc it to be process working dir in order to be able this script from anywhere
let cwd = execSync("git rev-parse --show-toplevel", {encoding: 'utf8'}).trim();
process.chdir(cwd);

/**
 * This function builds a new tag object from a given tag descriptions
 * @param tagDesc tag descriptions (format `object,ref,message`)
 * @returns a new created tag object (format: `{'object': xxxxxx, 'ref': xxxxxx, 'message': xxxxxx}`)
 */
function getTagFromDesc(tagDesc) {
  let tag = tagDesc.split(',');
  return {'object': tag[0], 'ref': tag[1], 'message': tag[2]};
}

/**
 * This function moves a given tag in master from a previous position to a new one if any
 * @param tag to move (format `{'object': xxxxxx, 'ref': xxxxxx, 'message': xxxxxx}`)
 */
function moveTag(tag) {
  // retrieve the commit message for the current tag
  exec(`git log -n 1 ${tag.object} --format=%s`, function (stderr, message) {
    if (stderr) console.error(stderr);
    if (message) {
      message = message.trim();

      // retrieve the last commit object with this message
      let object = execSync(`git rev-parse ':/${message}'`, {encoding: 'utf8'}).trim();
            
      var cmd = `git tag -a ${tag.ref} -m '${tag.message}' -f ${object}`;
      exec(cmd, function(stderr, stdout) {
        if (stdout) console.log(stdout);
        if (stderr) console.error(stderr);
      });          
    }
  })
}

/**
 * This function moves all existing tags in master from previous position to a new one if any
 */
function moveTags() {
  try {
    // find all tags descriptions   
    let tagDescs = execSync("git for-each-ref --format='%(objectname),%(refname:short),%(subject)' refs/tags", {encoding: 'utf8'}).trim().split('\n');
    for (let tagDesc of tagDescs) {
      let tag = getTagFromDesc(tagDesc);
      moveTag(tag);
    }
  }
  catch(e) {
    console.error("ERROR: ", e);
  }
}

moveTags();