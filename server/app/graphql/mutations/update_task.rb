# frozen_string_literal: true

module Mutations
  class UpdateTask < BaseMutation
    field :task, Types::TaskType, null: false
    field :message, [String], null: false

    argument :id, String, required: true
    argument :description, String, required: false
    argument :completed, Boolean, required: false

    def resolve(id:, description: nil, completed: nil)
      task = Task.find(id)

      params = {}
      params[:description] = description if description
      params[:completed] = completed unless completed.nil?

      if task.update(params)
        { 
          task: task, 
          message: [] 
        }
      else
        { 
          task: nil, 
          message: task.errors.full_messages 
        }
      end
    rescue ActiveRecord::RecordNotFound
      {
        task: nil,
        message: ["Task not found"]
      }
    end
  end
end