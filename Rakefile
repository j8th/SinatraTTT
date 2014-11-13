desc 'Run the normal test suite (same as \'rake spec\').'
task default: %w[spec]

desc 'Run the normal test suite, excluding some slower tests.'
task :spec do
  system 'rspec --tag ~slow'
  Rake::Task['jasmine:ci'].invoke
end

desc 'Run the full test suite.'
task :fullspec do
  system 'rspec'
  Rake::Task['jasmine:ci'].invoke
end


require 'jasmine'
load 'jasmine/tasks/jasmine.rake'
